
-- Add selected courier details to orders
ALTER TABLE orders
    ADD COLUMN courier_company_id INTEGER,
    ADD COLUMN courier_name VARCHAR(150);

-- Persist selected courier ID on shipments
ALTER TABLE shipments
    ADD COLUMN courier_company_id INTEGER;
