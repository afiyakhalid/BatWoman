package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.product.*;
import com.BatWoman.BatWoman_backend.entity.Category;
import com.BatWoman.BatWoman_backend.entity.Inventory;
import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.mapper.ProductMapper;
import com.BatWoman.BatWoman_backend.repository.CategoryRepository;
import com.BatWoman.BatWoman_backend.repository.InventoryRepository;
import com.BatWoman.BatWoman_backend.repository.ProductRepository;
import com.BatWoman.BatWoman_backend.service.ProductService;
import com.BatWoman.BatWoman_backend.util.SlugUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final InventoryRepository inventoryRepository;

    private final ProductMapper productMapper;

    @Override
    public ProductResponse createProduct(CreateProductRequest request) {

        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found."));

        String slug = SlugUtil.toSlug(request.name());

        if (productRepository.findBySlug(slug).isPresent()) {
            throw new ValidationException("Product slug already exists.");
        }

        Product product = productMapper.toEntity(request);

        product.setId(UUID.randomUUID());
        product.setCategory(category);

        product.setSlug(slug);

        product.setSku(
                "BAT-" +
                        UUID.randomUUID()
                                .toString()
                                .substring(0,8)
                                .toUpperCase()
        );

        product.setActive(true);

        product.setFeatured(
                Boolean.TRUE.equals(request.featured())
        );

        product.setNewArrival(
                Boolean.TRUE.equals(request.newArrival())
        );

        product.setCreatedAt(OffsetDateTime.now());
        product.setUpdatedAt(OffsetDateTime.now());

        Product savedProduct = productRepository.save(product);

        Inventory inventory = Inventory.builder()
                .id(UUID.randomUUID())
                .product(savedProduct)
                .availableQuantity(0)
                .reservedQuantity(0)
                .version(0L)
                .updatedAt(OffsetDateTime.now())
                .build();

        inventoryRepository.save(inventory);

        return productMapper.toResponse(savedProduct);
    }
    @Override
    public ProductResponse updateProduct(
            UUID productId,
            UpdateProductRequest request) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found."));

        if (request.categoryId() != null) {

            Category category = categoryRepository.findById(request.categoryId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Category not found."));

            product.setCategory(category);
        }

        productMapper.updateProductFromDto(request, product);

        if (request.name() != null) {

            String slug = SlugUtil.toSlug(request.name());

            if (!slug.equals(product.getSlug())
                    && productRepository.findBySlug(slug).isPresent()) {

                throw new ValidationException("Product slug already exists.");
            }

            product.setSlug(slug);
        }

        product.setUpdatedAt(OffsetDateTime.now());

        Product updatedProduct = productRepository.save(product);

        return productMapper.toResponse(updatedProduct);
    }
    @Override
    public void deleteProduct(UUID productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found."));

        productRepository.delete(product);
    }

    @Override
    public ProductDetailResponse getProductById(UUID productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found."));

        return productMapper.toDetailResponse(product);
    }

    @Override
    public ProductDetailResponse getProductBySlug(String slug) {

        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found."));

        return productMapper.toDetailResponse(product);
    }
    @Override
    public List<ProductCardResponse> getAllProducts() {

        return productRepository
                .findByActiveTrue(PageRequest.of(0, 100))
                .stream()
                .map(productMapper::toCardResponse)
                .toList();
    }
    @Override
    public List<ProductCardResponse> getFeaturedProducts() {

        return productRepository
                .findTop10ByFeaturedTrue()
                .stream()
                .map(productMapper::toCardResponse)
                .toList();
    }
    @Override
    public List<ProductCardResponse> getNewArrivals() {

        return productRepository
                .findTop10ByNewArrivalTrue()
                .stream()
                .map(productMapper::toCardResponse)
                .toList();
    }
    @Override
    public List<ProductCardResponse> searchProducts(
            ProductSearchRequest request) {

        return productRepository
                .findByNameContainingIgnoreCase(
                        request.keyword() == null ? "" : request.keyword(),
                        PageRequest.of(
                                request.page() == null ? 0 : request.page(),
                                request.size() == null ? 10 : request.size()
                        )
                )
                .stream()
                .map(productMapper::toCardResponse)
                .toList();
    }
    @Override
    public void uploadProductImages(
            UUID productId,
            List<MultipartFile> images) {

        throw new UnsupportedOperationException(
                "Image upload will be implemented with AWS S3."
        );
    }
}