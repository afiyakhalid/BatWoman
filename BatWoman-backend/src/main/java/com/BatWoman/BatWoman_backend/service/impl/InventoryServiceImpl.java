package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.entity.Inventory;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.repository.InventoryRepository;
import com.BatWoman.BatWoman_backend.service.InventoryService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;

    @Override
    public void reserveInventory(
            UUID productId,
            Integer quantity) {

        Inventory inventory = inventoryRepository
                .lockInventory(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Inventory not found."));

        if (inventory.getAvailableQuantity() < quantity) {
            throw new ValidationException(
                    "Insufficient inventory.");
        }

        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity() - quantity);

        inventory.setReservedQuantity(
                inventory.getReservedQuantity() + quantity);

        inventory.setUpdatedAt(OffsetDateTime.now());

        inventoryRepository.save(inventory);
    }

    @Override
    public void releaseInventory(
            UUID productId,
            Integer quantity) {

        Inventory inventory = inventoryRepository
                .lockInventory(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Inventory not found."));

        inventory.setReservedQuantity(
                Math.max(
                        0,
                        inventory.getReservedQuantity() - quantity
                )
        );

        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity() + quantity
        );

        inventory.setUpdatedAt(OffsetDateTime.now());

        inventoryRepository.save(inventory);
    }

    @Override
    public void reduceInventory(
            UUID productId,
            Integer quantity) {

        Inventory inventory = inventoryRepository
                .lockInventory(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Inventory not found."));

        if (inventory.getReservedQuantity() < quantity) {
            throw new ValidationException(
                    "Reserved inventory is insufficient.");
        }

        inventory.setReservedQuantity(
                inventory.getReservedQuantity() - quantity
        );

        inventory.setUpdatedAt(OffsetDateTime.now());

        inventoryRepository.save(inventory);
    }

    @Override
    public void increaseInventory(
            UUID productId,
            Integer quantity) {

        Inventory inventory = inventoryRepository
                .lockInventory(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Inventory not found."));

        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity() + quantity
        );

        inventory.setUpdatedAt(OffsetDateTime.now());

        inventoryRepository.save(inventory);
    }
}
