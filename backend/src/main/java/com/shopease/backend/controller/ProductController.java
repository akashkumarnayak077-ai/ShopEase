
package com.shopease.backend.controller;

import com.shopease.backend.entity.Product;
import com.shopease.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Get all products or search by name
    @GetMapping
    public List<Product> getProducts(
            @RequestParam(required = false) String search) {

        if (search != null && !search.trim().isEmpty()) {
            return productService.searchProducts(search.trim());
        }

        return productService.getAllProducts();
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {

        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
