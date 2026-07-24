INSERT INTO users (
    id,
    first_name,
    last_name,
    email,
    phone,
    password_hash,
    role,
    is_verified,
    is_active,
    created_at,
    updated_at
)
VALUES (
    gen_random_uuid(),
    'Afi',
    'Dory',
    'MoonlitBatwoman@gmail.com',
    '8951146294',
    '$2a$10$1jCh.rZ/pEpghHzei4KjleWrOhd0XepKZ.EH9.5XgbTnSo0FAHrYO',
    'ADMIN',
    TRUE,
    TRUE,
    NOW(),
    NOW()
);