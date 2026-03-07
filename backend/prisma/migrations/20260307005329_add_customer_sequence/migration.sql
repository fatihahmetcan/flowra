-- Create a sequence for customer codes to prevent race conditions.
-- This ensures atomic increments even with concurrent requests.
CREATE SEQUENCE IF NOT EXISTS customer_code_seq START WITH 1;

-- Optional: If you already have customers, you might want to 
-- restart the sequence at your current highest number + 1.
-- SELECT setval('customer_code_seq', (SELECT MAX(CAST(SUBSTRING(customer_code FROM 3) AS INTEGER)) FROM "Customer"));