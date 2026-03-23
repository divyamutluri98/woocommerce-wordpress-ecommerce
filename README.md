# E-commerce Platform - No API Keys Required

A fully functional standalone e-commerce platform with 150 products. **No external API keys needed** - works out of the box!

## Features

- **150 products** across 5 categories (Electronics, Clothing, Home & Garden, Sports, Books)
- Full shopping cart functionality with Zustand
- Product search & filtering
- Responsive design (mobile-friendly)
- Checkout flow with order confirmation
- Modern UI with Tailwind CSS & Radix UI
- SEO optimized with sitemap & robots.txt
- **Zero external dependencies** - runs completely standalone

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Open http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── products/          # Product listings & details
│   ├── checkout/          # Checkout page
│   ├── api/              # Simple API routes
│   └── page.tsx           # Homepage
├── components/
│   ├── products/         # ProductCard, ProductGrid, ProductDetails
│   ├── cart/            # CartDrawer, CartButton
│   ├── layout/          # Header, Footer
│   └── ui/              # Button, Card, Input, Badge, Dialog
├── lib/
│   ├── store.ts         # Zustand cart store
│   └── utils.ts         # Utilities
├── data/
│   └── products.ts      # 150 pre-loaded products
└── types/
    └── product.ts       # TypeScript types
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - Lightweight state management
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Beautiful icons

## How It Works

1. **Products**: 150 products are pre-loaded in `src/data/products.ts` - no database needed
2. **Cart**: Uses browser localStorage via Zustand persist - cart survives page refresh
3. **Checkout**: Simple order form that confirms orders locally (no payment processing)
4. **Search & Filter**: All filtering happens client-side with local data

## Customization

- Edit products in `src/data/products.ts`
- Customize colors in `tailwind.config.ts`
- Modify layout in `src/components/layout/`
- Add more categories or filtering options

## Deployment

Deploy to any static hosting:

### Vercel (Recommended)
```bash
vercel
```

### Docker
```bash
docker build -t ecommerce .
docker run -p 3000:3000 ecommerce
```

### Manual
```bash
npm run build
npm start
```

## Notes

This is a **standalone demo platform** perfect for:
- Testing and development
- Learning Next.js & React
- Template for custom projects
- Portfolio showcase

For production with real payments and backend integration, you would need:
- Stripe account for payment processing
- Backend API for orders
- Database for persistent orders
- WordPress/WooCommerce if needed

## License

MIT
