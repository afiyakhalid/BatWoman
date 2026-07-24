# BatWoman Frontend Documentation

## Overview

BatWoman Frontend is a Next.js application for a luxury abaya store. It contains:

- A customer storefront for browsing products, managing cart and wishlist data, and completing checkout.
- An admin area for inventory, orders, categories, reviews, payments, users, and dashboard management.
- Auth screens for login, registration, and password recovery.
- Shared UI, hooks, services, and stores that keep the feature areas consistent.

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn-style UI primitives
- TanStack React Query
- Zustand
- Axios
- Framer Motion
- Sonner for toasts
- next-themes for light and dark theme support

## Architecture

The app is built around a few core layers:

1. Route groups under `app/` define the customer, admin, and auth experiences.
2. Shared providers in `providers/` wrap the root application with React Query and theme state.
3. Feature services in `services/` handle API calls.
4. Hooks in `hooks/` expose reusable query and mutation logic.
5. Stores in `store/` keep client-side state such as auth tokens, cart, wishlist, and modal state.
6. Reusable presentation components live in `components/` and are grouped by domain.

The root layout loads the shared navbar, auth modal, toast system, theme provider, and query provider. The main API client automatically injects a bearer token from localStorage for protected requests.

## App Structure

### Root App Shell

- `app/layout.tsx` sets the document shell, theme provider, query provider, navbar, auth modal, and toast notifications.
- `app/globals.css` imports the design tokens and global styling baseline.
- `app/page.tsx` re-exports the customer home page.

### Route Groups

#### Customer

The customer experience lives under `app/customer/` and includes:

- Home page
- Product listing and product details
- Category browsing
- Search
- Cart
- Checkout
- Orders and order details
- Address management
- Profile
- Wishlist

#### Admin

The admin experience lives under `app/admin/` and includes:

- Dashboard
- Categories
- Inventory
- Orders
- Payments
- Products
- Reviews
- Users

#### Auth

The auth experience lives under `app/auth/` and includes:

- Login
- Register
- Forgot password

## Data Flow

### API Access

The shared Axios instance in `lib/axios.ts` uses `NEXT_PUBLIC_API_URL` as its base URL. When running in the browser, it reads the access token from localStorage and adds `Authorization: Bearer ...` to protected requests.

### Server State

React Query is configured in `lib/query-client.ts` with:

- one retry on failure
- no refetch on window focus
- a five minute stale time

This keeps product, category, order, and profile data consistent without over-fetching.

### Client State

Zustand stores manage fast-changing UI and session state:

- `store/auth.store.ts` stores access and refresh tokens.
- `store/cart.store.ts` manages the cart.
- `store/wishlist.store.ts` manages wishlist state.
- `store/authModal.store.ts` and `store/useAuthModal.ts` manage auth modal visibility.

## Services

The `services/` folder contains the API layer for each domain:

- `auth.service.ts` handles login, register, logout, and current-user requests.
- `product.service.ts` handles product data.
- `category.service.ts` handles category data.
- `cart.service.ts` handles cart operations.
- `order.service.ts` handles order retrieval and updates.
- `payment.service.ts` handles payment related requests.
- `review.service.ts` handles product reviews.
- `wishlist.service.ts` handles wishlist operations.
- `address.service.ts` handles address management.

## Hooks

Hooks in `hooks/` wrap feature logic and expose a cleaner API to components. Typical responsibilities include:

- Fetching data with React Query.
- Performing mutations for cart, wishlist, auth, and review actions.
- Enforcing authentication where needed.
- Returning derived state for rendering and loading states.

## Component Structure

### Layout Components

The `components/layout/` folder contains the shared navigation and shell pieces:

- `Navbar.tsx`
- `SearchBar.tsx`
- `MegaMenu.tsx`
- `AdminSidebar.tsx`
- `AdminHeader.tsx`
- `CustomerSidebar.tsx`
- `Footer/`

### Domain Components

Each business area has its own component group:

- `components/home/` for landing-page sections such as hero, featured products, testimonials, newsletter, and promotional banners.
- `components/product/` for product cards, galleries, info panels, tabs, reviews, and related products.
- `components/cart/` for cart rows, quantity controls, and summaries.
- `components/checkout/` for address, payment, and order summary UI.
- `components/address/` for address cards, forms, and empty states.
- `components/order/` for order cards, status, and timelines.
- `components/profile/` for profile cards and account navigation.
- `components/category/` for category cards and filters.
- `components/wishlist/` for wishlist cards.
- `components/admin/` for table and dashboard components used in the admin area.
- `components/auth/` for login, register, inputs, modal, and layout pieces.
- `components/ui/` for small reusable primitives like button, input, checkbox, dialog, and label.

## Styles and Theme

- `styles/theme.css` holds theme variables and design tokens.
- `app/globals.css` imports theme layers, sets base resets, and defines the global typography and spacing baseline.
- `providers/ThemeProvider.tsx` uses `next-themes` with class-based theme switching.

## Public Assets

Static assets are stored in `public/images/` and grouped by usage:

- `banner/`
- `categories/`
- `hero/`
- `logo/`
- `navbar/`

## Project Structure

```text
app/
  admin/
    categories/
    dashboard/
    inventory/
    orders/
    payments/
    products/
    reviews/
    users/
  auth/
    forgot-password/
    login/
    register/
  customer/
    address/
    cart/
    categories/
    checkout/
    orders/
    products/
    profile/
    search/
    wishlist/
components/
  address/
  admin/
  auth/
  cart/
  category/
  checkout/
  home/
  layout/
  order/
  product/
  profile/
  ui/
  wishlist/
constants/
hooks/
lib/
providers/
public/
  images/
services/
store/
styles/
types/
```

## Important Files

- `app/layout.tsx` is the global app shell.
- `lib/axios.ts` is the shared HTTP client.
- `lib/query-client.ts` configures React Query behavior.
- `store/auth.store.ts` manages tokens in localStorage.
- `providers/QueryProvider.tsx` provides React Query context.
- `providers/ThemeProvider.tsx` provides theme switching.
- `services/auth.service.ts` is the clearest example of the API pattern.

## Environment Setup

Create a local `.env.local` file with at least:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.example.com
```

Without this value, the Axios client cannot reach the backend API.

## Development Workflow

1. Install dependencies with `npm install`.
2. Start the app with `npm run dev`.
3. Keep shared UI in `components/` and domain logic in `services/`, `hooks/`, and `store/`.
4. Add new routes under the correct `app/` route group.
5. Use the shared API client instead of creating ad hoc Axios instances.

## Notes

The repository currently contains several empty placeholder modules, including some layout, constant, and hook files. They are part of the documented structure above and can be filled in as the app grows.
