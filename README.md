# WordPress E-commerce Platform

A production-ready e-commerce platform integrated with WordPress WooCommerce.

## Features

- 🛒 Full shopping cart functionality
- 💳 Stripe payment integration
- 📦 Order management
- 🔐 User authentication
- 📱 Responsive design
- ⚡ Fast static generation with Next.js
- 🔌 WordPress WooCommerce integration via REST API

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

```env
# WordPress
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wc/v3
WORDPRESS_CONSUMER_KEY=your_consumer_key
WORDPRESS_CONSUMER_SECRET=your_consumer_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Database (optional - for cart/orders)
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── (shop)/           # Shop pages
│   │   └── layout.tsx        # Root layout
│   ├── components/            # React components
│   │   ├── cart/             # Cart components
│   │   ├── checkout/         # Checkout components
│   │   ├── layout/           # Layout components
│   │   ├── products/         # Product components
│   │   └── ui/               # UI components
│   ├── lib/                   # Utilities
│   ├── hooks/                 # Custom hooks
│   ├── types/                 # TypeScript types
│   └── data/                  # Static product data
├── public/                     # Static assets
└── prisma/                     # Database schema
```

## Deployment

Deploy to Vercel:

```bash
vercel
```

## License

MIT
