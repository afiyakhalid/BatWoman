package com.BatWoman.BatWoman_backend.service.impl;
import com.BatWoman.BatWoman_backend.dto.product.UpdateProductVariantRequest;
import com.BatWoman.BatWoman_backend.dto.product.CreateProductRequest;
import com.BatWoman.BatWoman_backend.dto.product.ProductCardResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductDetailResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductMediaResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductSearchRequest;
import com.BatWoman.BatWoman_backend.dto.product.ProductVariantRequest;
import com.BatWoman.BatWoman_backend.dto.product.ProductVariantResponse;
import com.BatWoman.BatWoman_backend.dto.product.UpdateProductRequest;
import com.BatWoman.BatWoman_backend.entity.Category;
import com.BatWoman.BatWoman_backend.entity.Color;
import com.BatWoman.BatWoman_backend.entity.Inventory;
import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.entity.ProductMedia;
import com.BatWoman.BatWoman_backend.entity.ProductVariant;
import com.BatWoman.BatWoman_backend.entity.Size;
import com.BatWoman.BatWoman_backend.enums.MediaType;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.mapper.ProductMapper;
import com.BatWoman.BatWoman_backend.repository.CartItemRepository;
import com.BatWoman.BatWoman_backend.repository.CategoryRepository;
import com.BatWoman.BatWoman_backend.repository.ColorRepository;
import com.BatWoman.BatWoman_backend.repository.InventoryRepository;
import com.BatWoman.BatWoman_backend.repository.OrderItemRepository;
import com.BatWoman.BatWoman_backend.repository.ProductMediaRepository;
import com.BatWoman.BatWoman_backend.repository.ProductRepository;
import com.BatWoman.BatWoman_backend.repository.ProductVariantRepository;
import com.BatWoman.BatWoman_backend.repository.ReviewRepository;
import com.BatWoman.BatWoman_backend.repository.SizeRepository;
import com.BatWoman.BatWoman_backend.repository.WishlistRepository;
import com.BatWoman.BatWoman_backend.service.ProductService;
import com.BatWoman.BatWoman_backend.service.S3Service;
import com.BatWoman.BatWoman_backend.service.S3UploadResult;
import com.BatWoman.BatWoman_backend.service.media.MediaTypeDetector;
import com.BatWoman.BatWoman_backend.service.media.MediaValidator;
import com.BatWoman.BatWoman_backend.specification.ProductSpecification;
import com.BatWoman.BatWoman_backend.util.SlugUtil;
import lombok.RequiredArgsConstructor;
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

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final ProductVariantRepository productVariantRepository;

    private final ColorRepository colorRepository;

    private final SizeRepository sizeRepository;

    private final InventoryRepository inventoryRepository;

    private final ProductMapper productMapper;

    private final ProductMediaRepository productMediaRepository;

    private final MediaValidator mediaValidator;

    private final MediaTypeDetector mediaTypeDetector;

    private final S3Service s3Service;

    /*
     * These repositories are used specifically when a product is
     * physically deleted.
     */
    private final CartItemRepository cartItemRepository;

    private final ReviewRepository reviewRepository;

    private final WishlistRepository wishlistRepository;

    private final OrderItemRepository orderItemRepository;


    // ============================================================
    // Sorting
    // ============================================================

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


    // ============================================================
    // Create Product
    // ============================================================

    @Override
    public ProductResponse createProduct(
            CreateProductRequest request) {

        Category category =
                categoryRepository.findById(
                                request.categoryId()
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Category not found."
                                )
                        );

        if (request.variants() == null ||
                request.variants().isEmpty()) {

            throw new ValidationException(
                    "At least one product variant is required."
            );
        }

        /*
         * Validate slug before creating anything.
         */
        String slug =
                SlugUtil.toSlug(request.name());

        if (slug == null || slug.isBlank()) {

            throw new ValidationException(
                    "Product name cannot produce a valid slug."
            );
        }

        if (productRepository.findBySlug(slug).isPresent()) {

            throw new ValidationException(
                    "Product slug already exists."
            );
        }

        /*
         * Validate all variant requests before saving the product.
         *
         * This prevents creating a product and then discovering
         * halfway through that one of its variants is invalid.
         */
        validateVariantRequests(request.variants());

        /*
         * Create the product itself.
         *
         * SKU, color, size and inventory are intentionally NOT
         * stored on Product anymore.
         */
        Product product =
                productMapper.toEntity(request);

        product.setId(UUID.randomUUID());

        product.setCategory(category);

        product.setSlug(slug);

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

        OffsetDateTime now =
                OffsetDateTime.now();

        product.setCreatedAt(now);

        product.setUpdatedAt(now);

        Product savedProduct =
                productRepository.saveAndFlush(product);

        /*
         * Create every requested variant and its inventory.
         */
        List<ProductVariant> variants =
                new ArrayList<>();

        for (
                ProductVariantRequest variantRequest
                : request.variants()
        ) {

            Size size =
                    sizeRepository.findById(
                                    variantRequest.sizeId()
                            )
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Size not found: "
                                                    + variantRequest.sizeId()
                                    )
                            );

            Color color =
                    colorRepository.findById(
                                    variantRequest.colorId()
                            )
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Color not found: "
                                                    + variantRequest.colorId()
                                    )
                            );

            String sku =
                    normalizeSku(
                            variantRequest.sku()
                    );

            if (productVariantRepository.existsBySku(sku)) {

                throw new ValidationException(
                        "Variant SKU already exists: " + sku
                );
            }

            if (
                    productVariantRepository
                            .existsByProduct_IdAndSize_IdAndColor_Id(
                                    savedProduct.getId(),
                                    size.getId(),
                                    color.getId()
                            )
            ) {

                throw new ValidationException(
                        "A variant with this size and color already exists."
                );
            }

            ProductVariant variant =
                    ProductVariant.builder()
                            .id(UUID.randomUUID())
                            .product(savedProduct)
                            .size(size)
                            .color(color)
                            .sku(sku)
                            .active(true)
                            .createdAt(now)
                            .updatedAt(now)
                            .build();

            ProductVariant savedVariant =
                    productVariantRepository.saveAndFlush(
                            variant
                    );

            /*
             * Every variant owns exactly one inventory row.
             */
            Inventory inventory =
                    Inventory.builder()
                            .id(UUID.randomUUID())
                            .variant(savedVariant)
                            .availableQuantity(
                                    variantRequest.initialStock()
                            )
                            .reservedQuantity(0)
                            .updatedAt(now)
                            .build();

            inventoryRepository.save(inventory);

            savedVariant.setInventory(inventory);

            variants.add(savedVariant);
        }

        return toProductResponse(
                savedProduct,
                variants
        );
    }


    // ============================================================
    // Variant Validation
    // ============================================================

    private void validateVariantRequests(
            List<ProductVariantRequest> variantRequests) {

        Set<String> requestSkus =
                new HashSet<>();

        Set<String> requestCombinations =
                new HashSet<>();

        for (
                ProductVariantRequest request
                : variantRequests
        ) {

            if (request == null) {

                throw new ValidationException(
                        "Product variant cannot be null."
                );
            }

            String sku =
                    normalizeSku(
                            request.sku()
                    );

            if (!requestSkus.add(sku)) {

                throw new ValidationException(
                        "Duplicate variant SKU in request: "
                                + sku
                );
            }

            String combination =
                    request.sizeId()
                            + ":"
                            + request.colorId();

            if (!requestCombinations.add(combination)) {

                throw new ValidationException(
                        "Duplicate size and color combination in request."
                );
            }

            Size size =
                    sizeRepository.findById(
                            request.sizeId()
                    ).orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Size not found: "
                                            + request.sizeId()
                            )
                    );

            if (!Boolean.TRUE.equals(
                    size.getActive()
            )) {

                throw new ValidationException(
                        "Selected size is inactive."
                );
            }

            Color color =
                    colorRepository.findById(
                            request.colorId()
                    ).orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Color not found: "
                                            + request.colorId()
                            )
                    );

            if (!Boolean.TRUE.equals(
                    color.getActive()
            )) {

                throw new ValidationException(
                        "Selected color is inactive."
                );
            }

            if (request.initialStock() == null ||
                    request.initialStock() < 0) {

                throw new ValidationException(
                        "Initial stock cannot be negative."
                );
            }
        }
    }


    private String normalizeSku(String sku) {

        if (sku == null || sku.isBlank()) {

            throw new ValidationException(
                    "Variant SKU is required."
            );
        }

        return sku.trim();
    }


    // ============================================================
    // Update Product
    // ============================================================

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
                            )
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Category not found."
                                    )
                            );

            product.setCategory(category);
        }

        /*
         * Product-level fields are updated through the existing mapper.
         * Variant changes are handled separately below so that inventory
         * is never accidentally overwritten by a product edit.
         */
        productMapper.updateProductFromDto(
                request,
                product
        );

        if (request.name() != null &&
                !request.name().isBlank()) {

            String slug =
                    SlugUtil.toSlug(
                            request.name()
                    );

            if (slug == null || slug.isBlank()) {

                throw new ValidationException(
                        "Product name cannot produce a valid slug."
                );
            }

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
                productRepository.saveAndFlush(product);

        /*
         * A null variants list means that the caller is only updating
         * product-level fields. Existing variants remain untouched.
         * A supplied list can contain existing variants and/or new ones.
         */
        if (request.variants() != null) {

            if (request.variants().isEmpty()) {

                throw new ValidationException(
                        "At least one product variant is required."
                );
            }

            updateProductVariants(
                    productId,
                    request.variants()
            );
        }

        List<ProductVariant> variants =
                productVariantRepository.findByProduct_Id(
                        productId
                );

        return toProductResponse(
                updatedProduct,
                variants
        );
    }


    // ============================================================
    // Update / Create Product Variants
    // ============================================================

    private void updateProductVariants(
            UUID productId,
            List<UpdateProductVariantRequest> requests) {

        List<ProductVariant> existingVariants =
                productVariantRepository.findByProduct_Id(
                        productId
                );

        Map<UUID, ProductVariant> existingVariantsById =
                existingVariants.stream()
                        .collect(
                                Collectors.toMap(
                                        ProductVariant::getId,
                                        variant -> variant
                                )
                        );

        Set<String> requestSkus =
                new HashSet<>();

        Set<String> requestCombinations =
                new HashSet<>();

        for (
                UpdateProductVariantRequest request
                : requests
        ) {

            if (request == null) {

                throw new ValidationException(
                        "Product variant cannot be null."
                );
            }

            String sku =
                    normalizeSku(
                            request.sku()
                    );

            if (!requestSkus.add(sku)) {

                throw new ValidationException(
                        "Duplicate variant SKU in request: "
                                + sku
                );
            }

            String combination =
                    request.sizeId()
                            + ":"
                            + request.colorId();

            if (!requestCombinations.add(combination)) {

                throw new ValidationException(
                        "Duplicate size and color combination in request."
                );
            }

            Size size =
                    sizeRepository.findById(
                                    request.sizeId()
                            )
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Size not found: "
                                                    + request.sizeId()
                                    )
                            );

            if (!Boolean.TRUE.equals(
                    size.getActive()
            )) {

                throw new ValidationException(
                        "Selected size is inactive."
                );
            }

            Color color =
                    colorRepository.findById(
                                    request.colorId()
                            )
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Color not found: "
                                                    + request.colorId()
                                    )
                            );

            if (!Boolean.TRUE.equals(
                    color.getActive()
            )) {

                throw new ValidationException(
                        "Selected color is inactive."
                );
            }

            if (request.id() == null) {

                createVariantForExistingProduct(
                        productId,
                        size,
                        color,
                        sku,
                        request.initialStock()
                );

                continue;
            }

            ProductVariant variant =
                    existingVariantsById.get(
                            request.id()
                    );

            if (variant == null) {

                throw new ValidationException(
                        "Variant does not belong to this product: "
                                + request.id()
                );
            }

            validateExistingVariantSku(
                    variant.getId(),
                    sku
            );

            validateExistingVariantCombination(
                    variant.getId(),
                    productId,
                    size.getId(),
                    color.getId()
            );

            variant.setSize(size);
            variant.setColor(color);
            variant.setSku(sku);

            if (request.active() != null) {
                variant.setActive(request.active());
            }

            variant.setUpdatedAt(
                    OffsetDateTime.now()
            );

            productVariantRepository.save(
                    variant
            );
        }

        productVariantRepository.flush();
    }


    private void createVariantForExistingProduct(
            UUID productId,
            Size size,
            Color color,
            String sku,
            Integer initialStock) {

        if (initialStock == null || initialStock < 0) {

            throw new ValidationException(
                    "Initial stock is required for a new variant and cannot be negative."
            );
        }

        if (productVariantRepository.existsBySku(sku)) {

            throw new ValidationException(
                    "Variant SKU already exists: " + sku
            );
        }

        if (
                productVariantRepository
                        .existsByProduct_IdAndSize_IdAndColor_Id(
                                productId,
                                size.getId(),
                                color.getId()
                        )
        ) {

            throw new ValidationException(
                    "A variant with this size and color already exists."
            );
        }

        OffsetDateTime now =
                OffsetDateTime.now();

        Product product =
                productRepository.findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found."
                                )
                        );

        ProductVariant variant =
                ProductVariant.builder()
                        .id(UUID.randomUUID())
                        .product(product)
                        .size(size)
                        .color(color)
                        .sku(sku)
                        .active(true)
                        .createdAt(now)
                        .updatedAt(now)
                        .build();

        ProductVariant savedVariant =
                productVariantRepository.saveAndFlush(
                        variant
                );

        Inventory inventory =
                Inventory.builder()
                        .id(UUID.randomUUID())
                        .variant(savedVariant)
                        .availableQuantity(initialStock)
                        .reservedQuantity(0)
                        .updatedAt(now)
                        .build();

        inventoryRepository.saveAndFlush(
                inventory
        );

        savedVariant.setInventory(inventory);
    }


    private void validateExistingVariantSku(
            UUID variantId,
            String sku) {

        productVariantRepository
                .findBySku(sku)
                .ifPresent(existingVariant -> {

                    if (!existingVariant.getId().equals(variantId)) {

                        throw new ValidationException(
                                "Variant SKU already exists: " + sku
                        );
                    }
                });
    }


    private void validateExistingVariantCombination(
            UUID variantId,
            UUID productId,
            UUID sizeId,
            UUID colorId) {

        List<ProductVariant> variants =
                productVariantRepository.findByProduct_Id(
                        productId
                );

        boolean duplicate =
                variants.stream()
                        .anyMatch(variant ->
                                !variant.getId().equals(variantId)
                                        &&
                                        variant.getSize()
                                                .getId()
                                                .equals(sizeId)
                                        &&
                                        variant.getColor()
                                                .getId()
                                                .equals(colorId)
                        );

        if (duplicate) {

            throw new ValidationException(
                    "A variant with this size and color already exists."
            );
        }
    }


    // ============================================================
    // Delete Product
    // ============================================================

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
                productMediaRepository.findByProduct(
                        product
                );

        List<String> objectKeys =
                mediaList.stream()
                        .map(ProductMedia::getObjectKey)
                        .filter(
                                key ->
                                        key != null
                                                &&
                                                !key.isBlank()
                        )
                        .toList();

        /*
         * Products referenced by order history cannot be
         * physically deleted.
         */
        boolean usedInOrder =
                orderItemRepository
                        .existsByProduct_Id(productId);

        if (usedInOrder) {

            if (Boolean.TRUE.equals(
                    product.getActive()
            )) {

                product.setActive(false);

                product.setUpdatedAt(
                        OffsetDateTime.now()
                );

                productRepository.saveAndFlush(
                        product
                );

                return;
            }

            throw new ValidationException(
                    "This product cannot be permanently deleted because it exists in order history."
            );
        }

        /*
         * Product has never been ordered.
         *
         * V8 cascades product deletion to:
         * - product_variants
         * - product_media
         * - cart_items
         * - wishlist
         * - reviews
         *
         * ProductVariant then cascades to Inventory.
         */
        productRepository.delete(product);

        productRepository.flush();

        /*
         * Delete S3 objects only after the database transaction
         * has successfully committed.
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


    // ============================================================
    // Get Product
    // ============================================================

    @Override
    public ProductDetailResponse getProductById(
            UUID productId) {

        Product product =
                productRepository.findById(
                                productId
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found."
                                )
                        );

        return toProductDetailResponse(
                product
        );
    }


    @Override
    public ProductDetailResponse getProductBySlug(
            String slug) {

        Product product =
                productRepository.findBySlug(
                                slug
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found."
                                )
                        );

        return toProductDetailResponse(
                product
        );
    }


    // ============================================================
    // Product Lists
    // ============================================================

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


    // ============================================================
    // Product Search
    // ============================================================

    @Override
    public Page<ProductCardResponse> searchProducts(
            ProductSearchRequest request) {

        int page =
                request.page() == null ||
                        request.page() < 0
                        ? 0
                        : request.page();

        int size =
                request.size() == null ||
                        request.size() <= 0
                        ? 20
                        : request.size();

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        resolveSort(request.sort())
                );

        Specification<Product> specification =
                ProductSpecification.build(
                        request
                );

        return productRepository
                .findAll(
                        specification,
                        pageable
                )
                .map(this::toProductCardResponse);
    }


    // ============================================================
    // Product Response Mapping
    // ============================================================

    private ProductResponse toProductResponse(
            Product product,
            List<ProductVariant> variants) {

        ProductResponse baseResponse =
                productMapper.toResponse(
                        product
                );

        List<ProductVariantResponse> variantResponses =
                variants.stream()
                        .filter(
                                variant ->
                                        Boolean.TRUE.equals(
                                                variant.getActive()
                                        )
                        )
                        .map(
                                this::toProductVariantResponse
                        )
                        .toList();

        return new ProductResponse(
                baseResponse.id(),
                baseResponse.name(),
                baseResponse.slug(),
                baseResponse.description(),
                baseResponse.fabric(),
                baseResponse.price(),
                baseResponse.discountPrice(),
                baseResponse.featured(),
                baseResponse.newArrival(),
                baseResponse.active(),
                variantResponses
        );
    }


    private ProductDetailResponse toProductDetailResponse(
            Product product) {

        ProductDetailResponse baseResponse =
                productMapper.toDetailResponse(
                        product
                );

        List<ProductVariant> variants =
                productVariantRepository
                        .findByProduct_IdAndActiveTrue(
                                product.getId()
                        );

        List<ProductVariantResponse> variantResponses =
                variants.stream()
                        .map(
                                this::toProductVariantResponse
                        )
                        .toList();

        int availableQuantity =
                variants.stream()
                        .map(ProductVariant::getInventory)
                        .filter(
                                inventory ->
                                        inventory != null
                        )
                        .mapToInt(
                                inventory ->
                                        inventory
                                                .getAvailableQuantity()
                        )
                        .sum();

        List<ProductMediaResponse> media =
                productMediaRepository
                        .findByProductOrderByDisplayOrderAsc(
                                product
                        )
                        .stream()
                        .map(
                                this::toProductMediaResponse
                        )
                        .toList();

        return new ProductDetailResponse(
                baseResponse.id(),
                baseResponse.name(),
                baseResponse.slug(),
                baseResponse.description(),
                baseResponse.fabric(),
                baseResponse.price(),
                baseResponse.discountPrice(),
                availableQuantity,
                variantResponses,
                media
        );
    }


    private ProductVariantResponse toProductVariantResponse(
            ProductVariant variant) {

        Inventory inventory =
                variant.getInventory();

        Integer availableQuantity =
                inventory == null
                        ? 0
                        : inventory.getAvailableQuantity();

        Integer reservedQuantity =
                inventory == null
                        ? 0
                        : inventory.getReservedQuantity();

        Integer totalQuantity =
                availableQuantity
                        + reservedQuantity;

        Size size =
                variant.getSize();

        Color color =
                variant.getColor();

        return new ProductVariantResponse(
                variant.getId(),

                size.getId(),
                size.getLabel(),
                size.getNumericValue(),

                color.getId(),
                color.getName(),
                color.getCode(),
                color.getHexCode(),

                variant.getSku(),

                variant.getActive(),

                availableQuantity,
                reservedQuantity,
                totalQuantity
        );
    }


    private ProductCardResponse toProductCardResponse(
            Product product) {

        ProductCardResponse response =
                productMapper.toCardResponse(
                        product
                );

        List<ProductMediaResponse> media =
                productMediaRepository
                        .findByProductOrderByDisplayOrderAsc(
                                product
                        )
                        .stream()
                        .map(
                                this::toProductMediaResponse
                        )
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


    // ============================================================
    // Product Media
    // ============================================================

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

        if (
                media.getProduct() == null
                        ||
                        !media.getProduct()
                                .getId()
                                .equals(product.getId())
        ) {

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

            productMediaRepository.saveAndFlush(
                    media
            );

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

        if (
                !mediaById.keySet().equals(
                        new HashSet<>(mediaIds)
                )
        ) {

            throw new ValidationException(
                    "Media IDs must belong to this product and must not be duplicated."
            );
        }

        for (
                int i = 0;
                i < mediaIds.size();
                i++
        ) {

            ProductMedia productMedia =
                    mediaById.get(
                            mediaIds.get(i)
                    );

            productMedia.setDisplayOrder(
                    i + 1
            );
        }

        productMediaRepository.saveAll(
                media
        );
    }


    @Override
    public void deleteProductMedia(
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
         * If deleted media was primary,
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
         * Delete S3 object only after successful commit.
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

                                    } catch (Exception e) {

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

        if (
                media.getProduct() == null
                        ||
                        !media.getProduct()
                                .getId()
                                .equals(product.getId())
        ) {

            throw new ValidationException(
                    "Media does not belong to this product."
            );
        }

        productMediaRepository
                .findByProductAndPrimaryMediaTrue(
                        product
                )
                .ifPresent(
                        currentPrimary -> {

                            currentPrimary.setPrimaryMedia(
                                    false
                            );

                            productMediaRepository.save(
                                    currentPrimary
                            );
                        }
                );

        media.setPrimaryMedia(true);

        productMediaRepository.save(
                media
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
                        .findByProductAndPrimaryMediaTrue(
                                product
                        )
                        .isPresent();

        List<String> uploadedObjectKeys =
                new ArrayList<>();

        try {

            for (
                    MultipartFile file
                    : files
            ) {

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

                // 4. Upload

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

                productMediaRepository.save(
                        media
                );

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