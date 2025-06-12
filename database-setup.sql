-- Production Database Setup Script for Vercel Postgres
-- Copy and paste this into Vercel's Database Query interface

-- Create tables (schema)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User table
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Address table
CREATE TABLE IF NOT EXISTS "Address" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    name TEXT NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'US',
    phone TEXT,
    type TEXT NOT NULL DEFAULT 'shipping',
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Category table
CREATE TABLE IF NOT EXISTS "Category" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("parentId") REFERENCES "Category"(id)
);

-- Product table
CREATE TABLE IF NOT EXISTS "Product" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("categoryId") REFERENCES "Category"(id)
);

-- Order table
CREATE TABLE IF NOT EXISTS "Order" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User"(id)
);

-- OrderItem table
CREATE TABLE IF NOT EXISTS "OrderItem" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY ("orderId") REFERENCES "Order"(id),
    FOREIGN KEY ("productId") REFERENCES "Product"(id)
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS "Wishlist" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User"(id),
    FOREIGN KEY ("productId") REFERENCES "Product"(id)
);

-- Insert demo data
-- Categories
INSERT INTO "Category" (id, name, slug) VALUES 
('cat1', 'Electronics', 'electronics'),
('cat2', 'Clothing', 'clothing'),
('cat3', 'Home & Garden', 'home-garden'),
('cat4', 'Sports', 'sports')
ON CONFLICT (slug) DO NOTHING;

-- Products
INSERT INTO "Product" (id, name, slug, description, price, image, featured, "categoryId") VALUES 
('prod1', 'Wireless Bluetooth Headphones', 'wireless-bluetooth-headphones', 'High-quality wireless headphones with noise cancellation and long battery life.', 199.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', true, 'cat1'),
('prod2', 'Smartphone Case', 'smartphone-case', 'Durable protective case for your smartphone with military-grade protection.', 29.99, 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop', false, 'cat1'),
('prod3', 'Cotton T-Shirt', 'cotton-t-shirt', 'Comfortable 100% cotton t-shirt available in multiple colors and sizes.', 24.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', true, 'cat2'),
('prod4', 'Running Shoes', 'running-shoes', 'Lightweight and comfortable running shoes perfect for daily workouts.', 129.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', true, 'cat4'),
('prod5', 'Coffee Maker', 'coffee-maker', 'Programmable coffee maker with thermal carafe and built-in grinder.', 149.99, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop', false, 'cat3'),
('prod6', 'Wireless Mouse', 'wireless-mouse', 'Ergonomic wireless mouse with precision tracking and long battery life.', 49.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop', false, 'cat1'),
('prod7', 'Yoga Mat', 'yoga-mat', 'Non-slip yoga mat made from eco-friendly materials, perfect for all fitness levels.', 39.99, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop', false, 'cat4'),
('prod8', 'Desk Lamp', 'desk-lamp', 'Modern LED desk lamp with adjustable brightness and USB charging port.', 79.99, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop', false, 'cat3')
ON CONFLICT (slug) DO NOTHING;

-- Demo user (for testing)
INSERT INTO "User" (id, email, password, name) VALUES 
('user1', 'demo@example.com', 'password', 'Demo User'),
('user2', 'admin@example.com', 'password', 'Admin User')
ON CONFLICT (email) DO NOTHING;

-- Demo address
INSERT INTO "Address" ("userId", name, street, city, state, "zipCode", country, "isDefault") VALUES 
('user1', 'Demo User', '123 Main St', 'New York', 'NY', '10001', 'US', true)
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Database setup complete! Demo data has been inserted.' as status; 