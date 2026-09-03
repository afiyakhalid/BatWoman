package com.BatWoman.BatWoman_backend.service.impl;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.multipart.MultipartFile;

import com.BatWoman.BatWoman_backend.dto.product.CreateProductRequest;
import com.BatWoman.BatWoman_backend.dto.product.ProductCardResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductDetailResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductMediaResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductSearchRequest;
import com.BatWoman.BatWoman_backend.dto.product.UpdateProductRequest;
import com.BatWoman.BatWoman_backend.entity.Category;
import com.BatWoman.BatWoman_backend.entity.Inventory;
import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.entity.ProductMedia;
import com.BatWoman.BatWoman_backend.enums.MediaType;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.mapper.ProductMapper;
import com.BatWoman.BatWoman_backend.repository.CartItemRepository;
import com.BatWoman.BatWoman_backend.repository.CategoryRepository;
import com.BatWoman.BatWoman_backend.repository.InventoryRepository;
import com.BatWoman.BatWoman_backend.repository.OrderItemRepository;
import com.BatWoman.BatWoman_backend.repository.ProductMediaRepository;
import com.BatWoman.BatWoman_backend.repository.ProductRepository;
import com.BatWoman.BatWoman_backend.repository.ReviewRepository;
import com.BatWoman.BatWoman_backend.repository.WishListRepository;
import com.BatWoman.BatWoman_backend.service.ProductService;
import com.BatWoman.BatWoman_backend.service.S3Service;
import com.BatWoman.BatWoman_backend.service.S3UploadResult;
import com.BatWoman.BatWoman_backend.service.media.MediaTypeDetector;
import com.BatWoman.BatWoman_backend.service.media.MediaValidator;
import com.BatWoman.BatWoman_backend.specification.ProductSpecification;
import com.BatWoman.BatWoman_backend.util.SlugUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final InventoryRepository inventoryRepository;

    private final ProductMapper productMapper;

    private final ProductMediaRepository productMediaRepository;

    private final MediaValidator mediaValidator;

    private final MediaTypeDetector mediaTypeDetector;

    private final S3Service s3Service;

    /*
     * These repositories are used specifically when a product is
     * physically deleted. They remove database rows that reference
     * the product and would otherwise violate foreign-key constraints.
     */
    private final CartItemRepository cartItemRepository;

    private final ReviewRepository reviewRepository;

    private final WishListRepository wishListRepository;

    private final OrderItemRepository orderItemRepository;


    private Sort resolveSort(String sort) {

        if (sort == null || sort.isBlank()) {
            return Sort.by(
                    Sort.Direction.DESC,
                    "createdAt"
            );
        }

        return switch (sort) {

            case "featured" ->
                    Sort.by(
                            Sort.Direction.DESC,
                            "featured"
                    );

            case "newest" ->
                    Sort.by(
                            Sort.Direction.DESC,
                            "createdAt"
                    );

            case "price-low" ->
                    Sort.by(
                            Sort.Direction.ASC,
                            "price"
                    );

            case "price-high" ->
                    Sort.by(
                            Sort.Direction.DESC,
                            "price"
                    );

            case "name" ->
                    Sort.by(
                            Sort.Direction.ASC,
                            "name"
                    );

            default ->
                    Sort.by(
                            Sort.Direction.DESC,
                            "createdAt"
                    );
        };
    }


    @Override
    public ProductResponse createProduct(
            CreateProductRequest request) {

        Category category =
                categoryRepository.findById(request.categoryId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Category not found."
                                )
                        );

        String slug =
                SlugUtil.toSlug(request.name());

        if (productRepository.findBySlug(slug).isPresent()) {

            throw new ValidationException(
                    "Product slug already exists."
            );
        }

        Product product =
                productMapper.toEntity(request);

        product.setId(UUID.randomUUID());

        product.setCategory(category);

        product.setSlug(slug);

        product.setSku(
                "BAT-" +
                        UUID.randomUUID()
                                .toString()
                                .substring(0, 8)
                                .toUpperCase()
        );

        product.setActive(true);

        product.setFeatured(
                Boolean.TRUE.equals(
                        request.featured()
                )
        );

        product.setNewArrival(
                Boolean.TRUE.equals(
                        request.newArrival()
                )
        );

        product.setCreatedAt(
                OffsetDateTime.now()
        );

        product.setUpdatedAt(
                OffsetDateTime.now()
        );

        Product savedProduct =
                productRepository.save(product);

        Inventory inventory =
                Inventory.builder()
                        .id(UUID.randomUUID())
                        .product(savedProduct)
                        .availableQuantity(0)
                        .reservedQuantity(0)
                        .updatedAt(OffsetDateTime.now())
                        .build();

        inventoryRepository.save(inventory);

        return productMapper.toResponse(
                savedProduct
        );
    }


    @Override
    public void replaceProductMedia(
            UUID productId,
            UUID mediaId,
            MultipartFile file) {

        Product product =
                productRepository.findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found."
                                )
                        );

        ProductMedia media =
                productMediaRepository.findById(mediaId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product media not found."
                                )
                        );

        if (!media.getProduct().getId().equals(product.getId())) {

            throw new ValidationException(
                    "Media does not belong to this product."
            );
        }

        mediaValidator.validate(file);

        MediaType mediaType =
                mediaTypeDetector.detect(file);

        String oldObjectKey =
                media.getObjectKey();

        String folder =
                mediaType == MediaType.IMAGE
                        ? "products/" + productId + "/images"
                        : "products/" + productId + "/videos";

        S3UploadResult upload =
                s3Service.uploadFile(
                        file,
                        folder
                );

        String newObjectKey =
                upload.objectKey();

        String newMediaUrl =
                upload.mediaUrl();

        try {

            media.setMediaType(mediaType);

            media.setObjectKey(newObjectKey);

            media.setMediaUrl(newMediaUrl);

            media.setAltText(product.getName());

            productMediaRepository.saveAndFlush(media);

        } catch (Exception e) {

            try {
                s3Service.deleteFile(
                        newObjectKey
                );
            } catch (Exception ignored) {
            }

            throw new RuntimeException(
                    "Failed to replace product media.",
                    e
            );
        }

        try {

            s3Service.deleteFile(
                    oldObjectKey
            );

        } catch (Exception ignored) {
        }
    }


    @Override
    public void reorderProductMedia(
            UUID productId,
            List<UUID> mediaIds) {

        Product product =
                productRepository.findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found."
                                )
                        );

        List<ProductMedia> media =
                productMediaRepository
                        .findByProductOrderByDisplayOrderAsc(
                                product
                        );

        if (media.size() != mediaIds.size()) {

            throw new ValidationException(
                    "All product media IDs must be provided."
            );
        }

        Map<UUID, ProductMedia> mediaById =
                media.stream()
                        .collect(
                                Collectors.toMap(
                                        ProductMedia::getId,
                                        m -> m
                                )
                        );

        if (!mediaById.keySet().equals(
                new HashSet<>(mediaIds)
        )) {

            throw new ValidationException(
                    "Media IDs must belong to this product and must not be duplicated."
            );
        }

        for (int i = 0; i < mediaIds.size(); i++) {

            ProductMedia productMedia =
                    mediaById.get(
                            mediaIds.get(i)
                    );

            productMedia.setDisplayOrder(
                    i + 1
            );
        }

        productMediaRepository.saveAll(media);
    }


    @Override
    public void deleteProductMedia(
            UUID productId,
            UUID mediaId
    ) {

        Product product =
                productRepository.findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found."
                                )
                        );

        ProductMedia media =
                productMediaRepository.findById(mediaId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product media not found."
                                )
                        );

        if (
                media.getProduct() == null
                        ||
                        !productId.equals(
                                media.getProduct().getId()
                        )
        ) {

            throw new ValidationException(
                    "Media does not belong to this product."
            );
        }

        String objectKey =
                media.getObjectKey();

        boolean wasPrimary =
                Boolean.TRUE.equals(
                        media.getPrimaryMedia()
                );

        productMediaRepository.delete(
                media
        );

        productMediaRepository.flush();

        /*
         * If the deleted media was primary,
         * promote the next remaining media.
         */
        if (wasPrimary) {

            List<ProductMedia> remaining =
                    productMediaRepository
                            .findByProductOrderByDisplayOrderAsc(
                                    product
                            );

            if (!remaining.isEmpty()) {

                ProductMedia newPrimary =
                        remaining.get(0);

                newPrimary.setPrimaryMedia(
                        true
                );

                productMediaRepository.save(
                        newPrimary
                );
            }
        }

        /*
         * DB deletion succeeded.
         * Delete S3 object only after commit.
         */
        if (
                objectKey != null
                        &&
                        !objectKey.isBlank()
                        &&
                        TransactionSynchronizationManager
                                .isSynchronizationActive()
        ) {

            TransactionSynchronizationManager
                    .registerSynchronization(
                            new TransactionSynchronization() {

                                @Override
                                public void afterCommit() {

                                    try {

                                        s3Service.deleteFile(
                                                objectKey
                                        );

                                    } catch (
                                            Exception e
                                    ) {

                                        System.err.println(
                                                "Failed to delete S3 media object: "
                                                        + objectKey
                                        );

                                        e.printStackTrace();
                                    }
                                }
                            }
                    );
        }
    }


    @Override
    public void setPrimaryProductMedia(
            UUID productId,
            UUID mediaId) {

        Product product =
                productRepository.findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found."
                                )
                        );

        ProductMedia media =
                productMediaRepository.findById(mediaId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product media not found."
                                )
                        );

        if (!media.getProduct().getId().equals(
                product.getId()
        )) {

            throw new ValidationException(
                    "Media does not belong to this product."
            );
        }

        productMediaRepository
                .findByProductAndPrimaryMediaTrue(product)
                .ifPresent(
                        currentPrimary -> {
                            currentPrimary.setPrimaryMedia(false);
                            productMediaRepository.save(
                                    currentPrimary
                            );
                        }
                );

        media.setPrimaryMedia(true);

        productMediaRepository.save(media);
    }


    @Override
    public ProductResponse updateProduct(
            UUID productId,
            UpdateProductRequest request) {

        Product product =
                productRepository.findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found."
                                )
                        );

        if (request.categoryId() != null) {

            Category category =
                    categoryRepository.findById(
                            request.categoryId()
                    ).orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Category not found."
                            )
                    );

            product.setCategory(category);
        }

        productMapper.updateProductFromDto(
                request,
                product
        );

        if (request.name() != null) {

            String slug =
                    SlugUtil.toSlug(
                            request.name()
                    );

            if (
                    !slug.equals(product.getSlug())
                            &&
                            productRepository
                                    .findBySlug(slug)
                                    .isPresent()
            ) {

                throw new ValidationException(
                        "Product slug already exists."
                );
            }

            product.setSlug(slug);
        }

        product.setUpdatedAt(
                OffsetDateTime.now()
        );

        Product updatedProduct =
                productRepository.save(product);

        return productMapper.toResponse(
                updatedProduct
        );
    }


    /**
     * Deletes a product safely.
     *
     * There are two possible cases:
     *
     * 1. The product has never been used in an order.
     *    It can be physically deleted.
     *
     * 2. The product is referenced by an order item.
     *    It MUST NOT be physically deleted because order history
     *    depends on that row. In that case we deactivate it.
     *
     * S3 deletion is registered for AFTER the database transaction
     * successfully commits. This prevents the exact failure where
     * the image disappears from S3 but the product remains in the DB.
     */
    @Override
    public void deleteProduct(UUID productId) {

        Product product =
                productRepository.findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found."
                                )
                        );

        /*
         * Capture S3 keys BEFORE deleting the database record.
         */
        List<ProductMedia> mediaList =
                productMediaRepository.findByProduct(product);

        List<String> objectKeys =
                mediaList.stream()
                        .map(ProductMedia::getObjectKey)
                        .filter(
                                key ->
                                        key != null
                                                && !key.isBlank()
                        )
                        .toList();

        /*
         * IMPORTANT:
         *
         * order_items.product_id uses ON DELETE RESTRICT.
         *
         * Therefore a product that has appeared in an order
         * must never be physically deleted.
         */
        boolean usedInOrder =
                orderItemRepository
                        .existsByProduct_Id(productId);

        if (usedInOrder) {

            /*
             * Products that exist in order history must remain
             * in the database so historical orders remain valid.
             *
             * If the product is currently active, this is the
             * first deletion request, so deactivate it.
             *
             * If it is already inactive, there is nothing more
             * that can safely be deleted.
             */
            if (Boolean.TRUE.equals(product.getActive())) {

                product.setActive(false);
                product.setUpdatedAt(
                        OffsetDateTime.now()
                );

                productRepository.saveAndFlush(product);

                return;
            }

            throw new ValidationException(
                    "This product cannot be permanently deleted because it exists in order history."
            );
        }

        /*
         * Product has never been ordered.
         *
         * The database schema already cascades deletion to:
         * - product_media
         * - inventory
         * - cart_items
         * - wishlist
         * - reviews
         *
         * Therefore we only need to delete the product.
         */
        productRepository.delete(product);

        /*
         * Force SQL DELETE now.
         *
         * If this fails, the transaction rolls back and
         * S3 files remain untouched.
         */
        productRepository.flush();

        /*
         * Delete S3 files ONLY after the DB transaction commits.
         */
        if (
                !objectKeys.isEmpty()
                        &&
                        TransactionSynchronizationManager
                                .isSynchronizationActive()
        ) {

            TransactionSynchronizationManager
                    .registerSynchronization(
                            new TransactionSynchronization() {

                                @Override
                                public void afterCommit() {

                                    for (
                                            String objectKey
                                            : objectKeys
                                    ) {

                                        try {

                                            s3Service.deleteFile(
                                                    objectKey
                                            );

                                        } catch (Exception e) {

                                            System.err.println(
                                                    "Failed to delete S3 object after product deletion: "
                                                            + objectKey
                                            );

                                            e.printStackTrace();
                                        }
                                    }
                                }
                            }
                    );
        }
    }


    @Override
    public ProductDetailResponse getProductById(
            UUID productId) {

        Product product =
                productRepository.findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found."
                                )
                        );

        return toProductDetailResponse(product);
    }


    @Override
    public ProductDetailResponse getProductBySlug(
            String slug) {

        Product product =
                productRepository.findBySlug(slug)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found."
                                )
                        );

        return toProductDetailResponse(product);
    }


    @Override
    public List<ProductCardResponse> getAllProducts() {

        return productRepository
                .findByActiveTrue(
                        PageRequest.of(
                                0,
                                100,
                                resolveSort("newest")
                        )
                )
                .getContent()
                .stream()
                .map(this::toProductCardResponse)
                .toList();
    }

    @Override
    public List<ProductCardResponse> getAllProductsForAdmin() {

        return productRepository
                .findAll(
                        Sort.by(
                                Sort.Direction.DESC,
                                "createdAt"
                        )
                )
                .stream()
                .map(this::toProductCardResponse)
                .toList();
    }


    @Override
    public List<ProductCardResponse> getFeaturedProducts() {

        return productRepository
                .findTop10ByFeaturedTrue()
                .stream()
                .filter(
                        product ->
                                Boolean.TRUE.equals(
                                        product.getActive()
                                )
                )
                .map(this::toProductCardResponse)
                .toList();
    }


    @Override
    public List<ProductCardResponse> getNewArrivals() {

        return productRepository
                .findTop10ByNewArrivalTrue()
                .stream()
                .filter(
                        product ->
                                Boolean.TRUE.equals(
                                        product.getActive()
                                )
                )
                .map(this::toProductCardResponse)
                .toList();
    }


    @Override
    public Page<ProductCardResponse> searchProducts(
            ProductSearchRequest request) {

        Pageable pageable =
                PageRequest.of(
                        request.page(),
                        request.size(),
                        resolveSort(request.sort())
                );

        Specification<Product> specification =
                ProductSpecification.build(request);

        return productRepository
                .findAll(
                        specification,
                        pageable
                )
                .map(this::toProductCardResponse);
    }


    private ProductDetailResponse toProductDetailResponse(
            Product product) {

        ProductDetailResponse response =
                productMapper.toDetailResponse(product);

        List<ProductMediaResponse> media =
                productMediaRepository
                        .findByProductOrderByDisplayOrderAsc(
                                product
                        )
                        .stream()
                        .map(this::toProductMediaResponse)
                        .toList();

        return new ProductDetailResponse(

                response.id(),

                response.name(),

                response.slug(),

                response.description(),

                response.fabric(),

                response.color(),

                response.size(),

                response.price(),

                response.discountPrice(),

                response.availableQuantity(),

                media
        );
    }


    private ProductCardResponse toProductCardResponse(
            Product product) {

        ProductCardResponse response =
                productMapper.toCardResponse(product);

        List<ProductMediaResponse> media =
                productMediaRepository
                        .findByProductOrderByDisplayOrderAsc(
                                product
                        )
                        .stream()
                        .map(this::toProductMediaResponse)
                        .toList();

        return new ProductCardResponse(
                response.id(),
                response.name(),
                response.slug(),
                response.price(),
                response.discountPrice(),
                response.category(),
                media
        );
    }


    private ProductMediaResponse toProductMediaResponse(
            ProductMedia media) {

        String mediaUrl =
                s3Service.generatePresignedUrl(
                        media.getObjectKey()
                );

        return new ProductMediaResponse(
                media.getId(),
                media.getMediaType(),
                mediaUrl,
                media.getObjectKey(),
                media.getAltText(),
                media.getPrimaryMedia(),
                media.getDisplayOrder()
        );
    }

    @Override
    public void uploadProductFiles(
            UUID productId,
            List<MultipartFile> files) {

        System.out.println(
                "========== PRODUCT MEDIA SERVICE =========="
        );

        System.out.println(
                "Product ID: " + productId
        );

        System.out.println(
                "Files received: " + files.size()
        );

        Product product =
                productRepository.findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found."
                                )
                        );

        int displayOrder =
                (int) productMediaRepository
                        .countByProduct(product)
                        + 1;

        boolean hasPrimaryMedia =
                productMediaRepository
                        .findByProductAndPrimaryMediaTrue(product)
                        .isPresent();

        List<String> uploadedObjectKeys =
                new ArrayList<>();

        try {

            for (MultipartFile file : files) {

                System.out.println(
                        "----------------------------------------"
                );

                System.out.println(
                        "Processing file: "
                                + file.getOriginalFilename()
                );

                System.out.println(
                        "Content type: "
                                + file.getContentType()
                );

                System.out.println(
                        "Size: "
                                + file.getSize()
                );

                // 1. Validate
                System.out.println(
                        "STEP 1: Validating file..."
                );

                mediaValidator.validate(file);

                System.out.println(
                        "STEP 1 SUCCESS"
                );

                // 2. Detect media type
                System.out.println(
                        "STEP 2: Detecting media type..."
                );

                MediaType mediaType =
                        mediaTypeDetector.detect(file);

                System.out.println(
                        "STEP 2 SUCCESS -> "
                                + mediaType
                );

                // 3. Determine S3 folder
                String folder =
                        mediaType == MediaType.IMAGE
                                ? "products/"
                                  + productId
                                  + "/images"
                                : "products/"
                                  + productId
                                  + "/videos";

                System.out.println(
                        "STEP 3: S3 folder = "
                                + folder
                );

                // 4. Upload to S3
                System.out.println(
                        "STEP 4: Uploading to S3..."
                );

                S3UploadResult upload =
                        s3Service.uploadFile(
                                file,
                                folder
                        );

                System.out.println(
                        "STEP 4 SUCCESS"
                );

                String objectKey =
                        upload.objectKey();

                String mediaUrl =
                        upload.mediaUrl();

                System.out.println(
                        "S3 object key = "
                                + objectKey
                );

                System.out.println(
                        "S3 media URL = "
                                + mediaUrl
                );

                uploadedObjectKeys.add(
                        objectKey
                );

                // 5. Save database record
                System.out.println(
                        "STEP 5: Saving product_media..."
                );

                ProductMedia media =
                        ProductMedia.builder()
                                .id(UUID.randomUUID())
                                .product(product)
                                .mediaType(mediaType)
                                .objectKey(objectKey)
                                .mediaUrl(mediaUrl)
                                .altText(product.getName())
                                .primaryMedia(
                                        !hasPrimaryMedia
                                )
                                .displayOrder(
                                        displayOrder++
                                )
                                .createdAt(
                                        OffsetDateTime.now()
                                )
                                .build();

                productMediaRepository.save(media);

                System.out.println(
                        "STEP 5 SUCCESS"
                );

                hasPrimaryMedia = true;
            }

            System.out.println(
                    "========== MEDIA UPLOAD SUCCESS =========="
            );

        } catch (Exception e) {

            System.err.println(
                    "========== MEDIA UPLOAD FAILED =========="
            );

            System.err.println(
                    "Product ID: " + productId
            );

            System.err.println(
                    "ERROR TYPE: "
                            + e.getClass().getName()
            );

            System.err.println(
                    "ERROR MESSAGE: "
                            + e.getMessage()
            );

            e.printStackTrace();

            for (
                    String objectKey
                    : uploadedObjectKeys
            ) {

                try {

                    System.out.println(
                            "Cleaning up S3 object: "
                                    + objectKey
                    );

                    s3Service.deleteFile(
                            objectKey
                    );

                } catch (Exception cleanupException) {

                    System.err.println(
                            "Failed to cleanup S3 object: "
                                    + objectKey
                    );

                    cleanupException.printStackTrace();
                }
            }

            throw new RuntimeException(
                    "Failed to upload product media.",
                    e
            );
        }
    }
}