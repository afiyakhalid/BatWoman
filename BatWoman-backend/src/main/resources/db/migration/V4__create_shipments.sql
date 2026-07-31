CREATE TABLE IF NOT EXISTS shipments (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL UNIQUE,

    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',

    carrier VARCHAR(100),

    tracking_number VARCHAR(255) UNIQUE,

    tracking_url TEXT,

    expected_delivery TIMESTAMPTZ,

    shipped_at TIMESTAMPTZ,

    delivered_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_shipment_order
        FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_shipment_status
        CHECK (
            status IN (
                'PENDING',
                'PROCESSING',
                'PACKED',
                'SHIPPED',
                'OUT_FOR_DELIVERY',
                'DELIVERED',
                'RETURNED',
                'CANCELLED'
            )
        )

);

CREATE INDEX IF NOT EXISTS idx_shipments_order
    ON shipments(order_id);

CREATE INDEX IF NOT EXISTS idx_shipments_status
    ON shipments(status);

CREATE INDEX IF NOT EXISTS idx_shipments_tracking
    ON shipments(tracking_number);