CREATE TABLE IF NOT EXISTS shipment_tracking_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    shipment_id UUID NOT NULL,

    external_event_id VARCHAR(150),

    status VARCHAR(40) NOT NULL,

    description VARCHAR(500),

    location VARCHAR(255),

    latitude NUMERIC(10,7),

    longitude NUMERIC(10,7),

    event_time TIMESTAMPTZ NOT NULL,

    raw_payload TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_tracking_event_shipment
        FOREIGN KEY (shipment_id)
        REFERENCES shipments(id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_tracking_events_shipment_id
    ON shipment_tracking_events(shipment_id);

CREATE INDEX IF NOT EXISTS idx_tracking_events_event_time
    ON shipment_tracking_events(event_time);

CREATE INDEX IF NOT EXISTS idx_tracking_events_external_event_id
    ON shipment_tracking_events(external_event_id);