CREATE TYPE auth_provider AS ENUM (
    'LOCAL',
    'GOOGLE'
);

ALTER TABLE users
    ADD COLUMN provider auth_provider;

ALTER TABLE users
    ADD COLUMN provider_id VARCHAR(255);

UPDATE users
SET provider = 'LOCAL';

ALTER TABLE users
    ALTER COLUMN provider SET NOT NULL;