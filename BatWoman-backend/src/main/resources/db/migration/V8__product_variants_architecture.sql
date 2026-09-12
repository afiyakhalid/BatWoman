-- ===========================================================
-- V8__product_variants_architecture.sql
-- Replace product-level size/color/inventory with variants.
-- Existing V2 products are development/test data and are not
-- preserved by this migration.
-- ===========================================================

--------------------------------------------------------------
-- 0. Safety gate
--
-- Product rows referenced by order_items must never be removed,
-- because order_items intentionally uses ON DELETE RESTRICT.
-- If any orders have been created, stop rather than silently
-- destroying historical order data.
--------------------------------------------------------------
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM order_items LIMIT 1) THEN
        RAISE EXCEPTION
            'V8 aborted: order_items contains data. Test products cannot be removed while historical order items exist. Clear test orders explicitly first, then rerun V8.';
    END IF;
END $$;

--------------------------------------------------------------
-- 1. Remove disposable development product data
--
-- products is the parent of the following tables with CASCADE:
-- product_images, inventory, cart_items, wishlist, reviews,
-- product_media.
--
-- order_items is protected by the safety gate above.
--------------------------------------------------------------
DELETE FROM products;

--------------------------------------------------------------
-- 2. Color catalog
--------------------------------------------------------------
CREATE TABLE colors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    hex_code VARCHAR(7),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_color_name CHECK (name <> ''),
    CONSTRAINT chk_color_code CHECK (code <> ''),
    CONSTRAINT chk_color_hex CHECK (
        hex_code IS NULL OR hex_code ~ '^#[0-9A-Fa-f]{6}$'
    ),
    CONSTRAINT chk_color_display_order CHECK (display_order >= 0)
);

CREATE INDEX idx_colors_active_order
    ON colors(active, display_order);

--------------------------------------------------------------
-- 3. Size catalog
--------------------------------------------------------------
CREATE TABLE sizes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label VARCHAR(30) NOT NULL UNIQUE,
    numeric_value INTEGER NOT NULL UNIQUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_size_label CHECK (label <> ''),
    CONSTRAINT chk_size_display_order CHECK (display_order >= 0)
);

CREATE INDEX idx_sizes_active_order
    ON sizes(active, display_order);

--------------------------------------------------------------
-- 4. Initial size catalog
--------------------------------------------------------------
INSERT INTO sizes (label, numeric_value, display_order)
VALUES
    ('XS', 50, 1),
    ('S',  52, 2),
    ('M',  54, 3),
    ('L',  56, 4),
    ('XL', 58, 5),
    ('2XL', 60, 6),
    ('3XL', 62, 7);

--------------------------------------------------------------
-- 5. Colors are intentionally NOT seeded.
--
-- Colors are admin-managed database records. The Admin Dashboard
-- will create them through the Color management API.
--------------------------------------------------------------

--------------------------------------------------------------
-- 6. Product variants
--------------------------------------------------------------
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL,
    size_id UUID NOT NULL,
    color_id UUID NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_variant_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_variant_size
        FOREIGN KEY (size_id)
        REFERENCES sizes(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_variant_color
        FOREIGN KEY (color_id)
        REFERENCES colors(id)
        ON DELETE RESTRICT,

    CONSTRAINT uq_variant_product_size_color
        UNIQUE (product_id, size_id, color_id),

    CONSTRAINT chk_variant_sku
        CHECK (sku <> '')
);

CREATE INDEX idx_variants_product
    ON product_variants(product_id);

CREATE INDEX idx_variants_size
    ON product_variants(size_id);

CREATE INDEX idx_variants_color
    ON product_variants(color_id);

CREATE INDEX idx_variants_active
    ON product_variants(active);

--------------------------------------------------------------
-- 7. Inventory becomes variant-level
--------------------------------------------------------------
ALTER TABLE inventory
    DROP CONSTRAINT fk_inventory_product;

DROP INDEX IF EXISTS idx_inventory_product;

ALTER TABLE inventory
    DROP COLUMN product_id;

ALTER TABLE inventory
    ADD COLUMN variant_id UUID NOT NULL;

ALTER TABLE inventory
    ADD CONSTRAINT fk_inventory_variant
        FOREIGN KEY (variant_id)
        REFERENCES product_variants(id)
        ON DELETE CASCADE;

ALTER TABLE inventory
    ADD CONSTRAINT uq_inventory_variant
        UNIQUE (variant_id);

CREATE INDEX idx_inventory_variant
    ON inventory(variant_id);

--------------------------------------------------------------
-- 8. Cart items become variant-level
--------------------------------------------------------------
ALTER TABLE cart_items
    DROP CONSTRAINT fk_cartitem_product;

ALTER TABLE cart_items
    DROP CONSTRAINT uq_cart_product;

ALTER TABLE cart_items
    DROP COLUMN product_id;

ALTER TABLE cart_items
    ADD COLUMN variant_id UUID NOT NULL;

ALTER TABLE cart_items
    ADD CONSTRAINT fk_cartitem_variant
        FOREIGN KEY (variant_id)
        REFERENCES product_variants(id)
        ON DELETE CASCADE;

ALTER TABLE cart_items
    ADD CONSTRAINT uq_cart_variant
        UNIQUE (cart_id, variant_id);

CREATE INDEX idx_cart_items_variant
    ON cart_items(variant_id);

--------------------------------------------------------------
-- 9. Order items retain product_id for historical product
--    identity and additionally store the exact variant.
--------------------------------------------------------------
ALTER TABLE order_items
    ADD COLUMN variant_id UUID NOT NULL;

ALTER TABLE order_items
    ADD COLUMN variant_sku VARCHAR(100) NOT NULL;

ALTER TABLE order_items
    ADD COLUMN size VARCHAR(30) NOT NULL;

ALTER TABLE order_items
    ADD COLUMN color VARCHAR(100) NOT NULL;

ALTER TABLE order_items
    ADD CONSTRAINT fk_orderitem_variant
        FOREIGN KEY (variant_id)
        REFERENCES product_variants(id)
        ON DELETE RESTRICT;

CREATE INDEX idx_order_items_variant
    ON order_items(variant_id);

--------------------------------------------------------------
-- 10. Remove obsolete product-level variation fields
--------------------------------------------------------------
ALTER TABLE products
    DROP COLUMN sku,
    DROP COLUMN color,
    DROP COLUMN size;

--------------------------------------------------------------
-- 11. Product-level indexes that are no longer valid
--------------------------------------------------------------
-- No explicit indexes exist for product sku/color/size in V1;
-- their removal is therefore fully covered by the DROP COLUMNs.

--------------------------------------------------------------
-- 12. Final integrity assertions
--------------------------------------------------------------
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'products'
          AND column_name IN ('sku', 'color', 'size')
    ) THEN
        RAISE EXCEPTION 'V8 failed: obsolete product variation columns still exist.';
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'product_variants'
          AND column_name = 'product_id'
    ) THEN
        RAISE EXCEPTION 'V8 failed: product_variants.product_id does not exist.';
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'inventory'
          AND column_name = 'variant_id'
    ) THEN
        RAISE EXCEPTION 'V8 failed: inventory.variant_id does not exist.';
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'cart_items'
          AND column_name = 'variant_id'
    ) THEN
        RAISE EXCEPTION 'V8 failed: cart_items.variant_id does not exist.';
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'order_items'
          AND column_name = 'variant_id'
    ) THEN
        RAISE EXCEPTION 'V8 failed: order_items.variant_id does not exist.';
    END IF;
END $$;
