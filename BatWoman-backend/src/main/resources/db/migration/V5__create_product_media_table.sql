CREATE TABLE product_media
(
    id UUID PRIMARY KEY,

    product_id UUID NOT NULL,

    media_type VARCHAR(20) NOT NULL,

    object_key TEXT NOT NULL,

    media_url TEXT NOT NULL,

    alt_text TEXT,

    is_primary BOOLEAN NOT NULL,

    display_order INTEGER NOT NULL,

    created_at TIMESTAMPTZ NOT NULL,

    CONSTRAINT fk_product_media_product
        FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE
);

CREATE INDEX idx_product_media_product
    ON product_media(product_id);

CREATE INDEX idx_product_media_display_order
    ON product_media(display_order);

CREATE INDEX idx_product_media_primary
    ON product_media(product_id, is_primary);