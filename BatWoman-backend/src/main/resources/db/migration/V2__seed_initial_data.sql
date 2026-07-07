-- ===========================================================
-- V2__seed_initial_data.sql
-- Development Seed Data (18 Products)
-- ===========================================================

--------------------------------------------------------------
-- CATEGORIES
--------------------------------------------------------------
INSERT INTO categories (name, slug, description, display_order)
VALUES
('Luxury', 'luxury', 'Premium handcrafted luxury abayas.', 1),
('Minimal', 'minimal', 'Simple, elegant and timeless abayas.', 2),
('Everyday', 'everyday', 'Comfortable abayas designed for everyday wear.', 3),
('Classic', 'classic', 'Traditional abayas with modern tailoring.', 4),
('Party Wear', 'party-wear', 'Elegant abayas for celebrations and special occasions.', 5),
('Premium Collection', 'premium-collection', 'Exclusive designer collection.', 6)
ON CONFLICT (slug) DO NOTHING;

--------------------------------------------------------------
-- PRODUCTS
--------------------------------------------------------------
INSERT INTO products
(category_id, name, slug, sku, description, fabric, color, size, price, discount_price, featured, new_arrival, active)
VALUES
-- LUXURY
((SELECT id FROM categories WHERE slug='luxury'), 'Luxury Black Abaya', 'luxury-black-abaya', 'BW-1001', 'Premium black abaya with elegant detailing.', 'Nida', 'Black', 'M', 4999.00, 4499.00, TRUE, TRUE, TRUE),
((SELECT id FROM categories WHERE slug='luxury'), 'Luxury Emerald Abaya', 'luxury-emerald-abaya', 'BW-1002', 'Emerald luxury collection.', 'Nida', 'Emerald', 'M', 5499.00, NULL, TRUE, FALSE, TRUE),
((SELECT id FROM categories WHERE slug='luxury'), 'Luxury Midnight Abaya', 'luxury-midnight-abaya', 'BW-1003', 'Deep midnight blue with hand-stitched beads.', 'Silk', 'Navy', 'L', 5999.00, 5299.00, TRUE, TRUE, TRUE),

-- MINIMAL
((SELECT id FROM categories WHERE slug='minimal'), 'Minimal Sand Abaya', 'minimal-sand-abaya', 'BW-2001', 'Minimal everyday luxury.', 'Linen', 'Beige', 'M', 2999.00, 2699.00, FALSE, TRUE, TRUE),
((SELECT id FROM categories WHERE slug='minimal'), 'Minimal Ivory Abaya', 'minimal-ivory-abaya', 'BW-2002', 'Lightweight minimal abaya.', 'Linen', 'Ivory', 'M', 3199.00, 2889.00, FALSE, FALSE, TRUE),
((SELECT id FROM categories WHERE slug='minimal'), 'Minimal Olive Abaya', 'minimal-olive-abaya', 'BW-2003', 'Subtle earthy tones for a modern look.', 'Cotton Blend', 'Olive', 'S', 2899.00, NULL, FALSE, TRUE, TRUE),

-- EVERYDAY
((SELECT id FROM categories WHERE slug='everyday'), 'Daily Comfort Mocha', 'daily-comfort-mocha', 'BW-3001', 'Soft everyday abaya.', 'Cotton', 'Mocha', 'M', 2499.00, 2199.00, FALSE, TRUE, TRUE),
((SELECT id FROM categories WHERE slug='everyday'), 'Daily Comfort Slate', 'daily-comfort-slate', 'BW-3002', 'Breathable fabric for daily wear.', 'Cotton', 'Grey', 'L', 2499.00, NULL, FALSE, FALSE, TRUE),
((SELECT id FROM categories WHERE slug='everyday'), 'Daily Comfort Navy', 'daily-comfort-navy', 'BW-3003', 'Your go-to everyday navy abaya.', 'Jersey', 'Navy', 'M', 2299.00, 1999.00, FALSE, FALSE, TRUE),

-- CLASSIC
((SELECT id FROM categories WHERE slug='classic'), 'Classic Black Crepe', 'classic-black-crepe', 'BW-4001', 'Traditional classic design.', 'Crepe', 'Black', 'M', 3499.00, NULL, FALSE, FALSE, TRUE),
((SELECT id FROM categories WHERE slug='classic'), 'Classic Maroon Tailored', 'classic-maroon-tailored', 'BW-4002', 'Rich maroon with traditional tailoring.', 'Crepe', 'Maroon', 'M', 3599.00, 3299.00, FALSE, FALSE, TRUE),
((SELECT id FROM categories WHERE slug='classic'), 'Classic Taupe A-Line', 'classic-taupe-aline', 'BW-4003', 'Flowy A-line cut in soft taupe.', 'Chiffon', 'Taupe', 'L', 3699.00, NULL, TRUE, FALSE, TRUE),

-- PARTY WEAR
((SELECT id FROM categories WHERE slug='party-wear'), 'Embellished Noir Abaya', 'embellished-noir-abaya', 'BW-5001', 'Stunning black abaya for evening events.', 'Nida', 'Black', 'M', 6499.00, 5999.00, TRUE, TRUE, TRUE),
((SELECT id FROM categories WHERE slug='party-wear'), 'Rose Gold Celebration', 'rose-gold-celebration', 'BW-5002', 'Shimmering rose gold accents.', 'Silk Blend', 'Rose Gold', 'S', 6999.00, NULL, TRUE, FALSE, TRUE),
((SELECT id FROM categories WHERE slug='party-wear'), 'Crystal Drape Abaya', 'crystal-drape-abaya', 'BW-5003', 'Elegant draping with crystal cuffs.', 'Georgette', 'Silver', 'M', 7499.00, 6899.00, FALSE, TRUE, TRUE),

-- PREMIUM COLLECTION
((SELECT id FROM categories WHERE slug='premium-collection'), 'Royal Velvet Abaya', 'royal-velvet-abaya', 'BW-6001', 'Winter luxury in crushed velvet.', 'Velvet', 'Burgundy', 'M', 8999.00, NULL, TRUE, TRUE, TRUE),
((SELECT id FROM categories WHERE slug='premium-collection'), 'Designer Silk Blend', 'designer-silk-blend', 'BW-6002', 'Exclusive runway collection.', 'Silk', 'Champagne', 'M', 9499.00, 8499.00, TRUE, FALSE, TRUE),
((SELECT id FROM categories WHERE slug='premium-collection'), 'Signature Gold Stitch', 'signature-gold-stitch', 'BW-6003', 'Hand-stitched gold thread details.', 'Premium Nida', 'Black', 'L', 9999.00, NULL, TRUE, TRUE, TRUE)
ON CONFLICT (slug) DO NOTHING;

--------------------------------------------------------------
-- INVENTORY
--------------------------------------------------------------
INSERT INTO inventory (product_id, available_quantity, reserved_quantity)
SELECT id, 50, 0 FROM products
ON CONFLICT (product_id) DO NOTHING;

--------------------------------------------------------------
-- PRODUCT IMAGES (3 images per product = 54 images)
--------------------------------------------------------------
INSERT INTO product_images (product_id, object_key, alt_text, display_order, is_primary)
VALUES
-- 1. Luxury Black
((SELECT id FROM products WHERE slug='luxury-black-abaya'), 'https://picsum.photos/seed/lux-black-front/800/1200', 'Luxury Black - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='luxury-black-abaya'), 'https://picsum.photos/seed/lux-black-side/800/1200', 'Luxury Black - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='luxury-black-abaya'), 'https://picsum.photos/seed/lux-black-back/800/1200', 'Luxury Black - Back', 3, FALSE),

-- 2. Luxury Emerald
((SELECT id FROM products WHERE slug='luxury-emerald-abaya'), 'https://picsum.photos/seed/lux-emerald-front/800/1200', 'Luxury Emerald - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='luxury-emerald-abaya'), 'https://picsum.photos/seed/lux-emerald-side/800/1200', 'Luxury Emerald - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='luxury-emerald-abaya'), 'https://picsum.photos/seed/lux-emerald-back/800/1200', 'Luxury Emerald - Back', 3, FALSE),

-- 3. Luxury Midnight
((SELECT id FROM products WHERE slug='luxury-midnight-abaya'), 'https://picsum.photos/seed/lux-mid-front/800/1200', 'Luxury Midnight - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='luxury-midnight-abaya'), 'https://picsum.photos/seed/lux-mid-side/800/1200', 'Luxury Midnight - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='luxury-midnight-abaya'), 'https://picsum.photos/seed/lux-mid-back/800/1200', 'Luxury Midnight - Back', 3, FALSE),

-- 4. Minimal Sand
((SELECT id FROM products WHERE slug='minimal-sand-abaya'), 'https://picsum.photos/seed/min-sand-front/800/1200', 'Minimal Sand - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='minimal-sand-abaya'), 'https://picsum.photos/seed/min-sand-side/800/1200', 'Minimal Sand - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='minimal-sand-abaya'), 'https://picsum.photos/seed/min-sand-back/800/1200', 'Minimal Sand - Back', 3, FALSE),

-- 5. Minimal Ivory
((SELECT id FROM products WHERE slug='minimal-ivory-abaya'), 'https://picsum.photos/seed/min-ivory-front/800/1200', 'Minimal Ivory - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='minimal-ivory-abaya'), 'https://picsum.photos/seed/min-ivory-side/800/1200', 'Minimal Ivory - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='minimal-ivory-abaya'), 'https://picsum.photos/seed/min-ivory-back/800/1200', 'Minimal Ivory - Back', 3, FALSE),

-- 6. Minimal Olive
((SELECT id FROM products WHERE slug='minimal-olive-abaya'), 'https://picsum.photos/seed/min-olive-front/800/1200', 'Minimal Olive - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='minimal-olive-abaya'), 'https://picsum.photos/seed/min-olive-side/800/1200', 'Minimal Olive - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='minimal-olive-abaya'), 'https://picsum.photos/seed/min-olive-back/800/1200', 'Minimal Olive - Back', 3, FALSE),

-- 7. Daily Comfort Mocha
((SELECT id FROM products WHERE slug='daily-comfort-mocha'), 'https://picsum.photos/seed/day-mocha-front/800/1200', 'Comfort Mocha - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='daily-comfort-mocha'), 'https://picsum.photos/seed/day-mocha-side/800/1200', 'Comfort Mocha - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='daily-comfort-mocha'), 'https://picsum.photos/seed/day-mocha-back/800/1200', 'Comfort Mocha - Back', 3, FALSE),

-- 8. Daily Comfort Slate
((SELECT id FROM products WHERE slug='daily-comfort-slate'), 'https://picsum.photos/seed/day-slate-front/800/1200', 'Comfort Slate - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='daily-comfort-slate'), 'https://picsum.photos/seed/day-slate-side/800/1200', 'Comfort Slate - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='daily-comfort-slate'), 'https://picsum.photos/seed/day-slate-back/800/1200', 'Comfort Slate - Back', 3, FALSE),

-- 9. Daily Comfort Navy
((SELECT id FROM products WHERE slug='daily-comfort-navy'), 'https://picsum.photos/seed/day-navy-front/800/1200', 'Comfort Navy - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='daily-comfort-navy'), 'https://picsum.photos/seed/day-navy-side/800/1200', 'Comfort Navy - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='daily-comfort-navy'), 'https://picsum.photos/seed/day-navy-back/800/1200', 'Comfort Navy - Back', 3, FALSE),

-- 10. Classic Black Crepe
((SELECT id FROM products WHERE slug='classic-black-crepe'), 'https://picsum.photos/seed/clas-black-front/800/1200', 'Classic Black - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='classic-black-crepe'), 'https://picsum.photos/seed/clas-black-side/800/1200', 'Classic Black - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='classic-black-crepe'), 'https://picsum.photos/seed/clas-black-back/800/1200', 'Classic Black - Back', 3, FALSE),

-- 11. Classic Maroon
((SELECT id FROM products WHERE slug='classic-maroon-tailored'), 'https://picsum.photos/seed/clas-maroon-front/800/1200', 'Classic Maroon - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='classic-maroon-tailored'), 'https://picsum.photos/seed/clas-maroon-side/800/1200', 'Classic Maroon - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='classic-maroon-tailored'), 'https://picsum.photos/seed/clas-maroon-back/800/1200', 'Classic Maroon - Back', 3, FALSE),

-- 12. Classic Taupe
((SELECT id FROM products WHERE slug='classic-taupe-aline'), 'https://picsum.photos/seed/clas-taupe-front/800/1200', 'Classic Taupe - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='classic-taupe-aline'), 'https://picsum.photos/seed/clas-taupe-side/800/1200', 'Classic Taupe - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='classic-taupe-aline'), 'https://picsum.photos/seed/clas-taupe-back/800/1200', 'Classic Taupe - Back', 3, FALSE),

-- 13. Embellished Noir
((SELECT id FROM products WHERE slug='embellished-noir-abaya'), 'https://picsum.photos/seed/pty-noir-front/800/1200', 'Embellished Noir - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='embellished-noir-abaya'), 'https://picsum.photos/seed/pty-noir-side/800/1200', 'Embellished Noir - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='embellished-noir-abaya'), 'https://picsum.photos/seed/pty-noir-back/800/1200', 'Embellished Noir - Back', 3, FALSE),

-- 14. Rose Gold
((SELECT id FROM products WHERE slug='rose-gold-celebration'), 'https://picsum.photos/seed/pty-rose-front/800/1200', 'Rose Gold - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='rose-gold-celebration'), 'https://picsum.photos/seed/pty-rose-side/800/1200', 'Rose Gold - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='rose-gold-celebration'), 'https://picsum.photos/seed/pty-rose-back/800/1200', 'Rose Gold - Back', 3, FALSE),

-- 15. Crystal Drape
((SELECT id FROM products WHERE slug='crystal-drape-abaya'), 'https://picsum.photos/seed/pty-crys-front/800/1200', 'Crystal Drape - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='crystal-drape-abaya'), 'https://picsum.photos/seed/pty-crys-side/800/1200', 'Crystal Drape - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='crystal-drape-abaya'), 'https://picsum.photos/seed/pty-crys-back/800/1200', 'Crystal Drape - Back', 3, FALSE),

-- 16. Royal Velvet
((SELECT id FROM products WHERE slug='royal-velvet-abaya'), 'https://picsum.photos/seed/prem-velvet-front/800/1200', 'Royal Velvet - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='royal-velvet-abaya'), 'https://picsum.photos/seed/prem-velvet-side/800/1200', 'Royal Velvet - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='royal-velvet-abaya'), 'https://picsum.photos/seed/prem-velvet-back/800/1200', 'Royal Velvet - Back', 3, FALSE),

-- 17. Designer Silk
((SELECT id FROM products WHERE slug='designer-silk-blend'), 'https://picsum.photos/seed/prem-silk-front/800/1200', 'Designer Silk - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='designer-silk-blend'), 'https://picsum.photos/seed/prem-silk-side/800/1200', 'Designer Silk - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='designer-silk-blend'), 'https://picsum.photos/seed/prem-silk-back/800/1200', 'Designer Silk - Back', 3, FALSE),

-- 18. Signature Gold
((SELECT id FROM products WHERE slug='signature-gold-stitch'), 'https://picsum.photos/seed/prem-gold-front/800/1200', 'Signature Gold - Front', 1, TRUE),
((SELECT id FROM products WHERE slug='signature-gold-stitch'), 'https://picsum.photos/seed/prem-gold-side/800/1200', 'Signature Gold - Side', 2, FALSE),
((SELECT id FROM products WHERE slug='signature-gold-stitch'), 'https://picsum.photos/seed/prem-gold-back/800/1200', 'Signature Gold - Back', 3, FALSE);