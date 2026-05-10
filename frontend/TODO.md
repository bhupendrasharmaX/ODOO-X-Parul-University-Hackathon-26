# TODO - Traveloop Premium Retrofit

## Step 1: Global Design System
- [x] Update `src/index.css` to fully match typography specs (H1 48 bold, H2 32 semibold, H3 24 medium, letter-spacing -0.02em, body line-height 1.6).
- [ ] Ensure required exact shadow values are used via CSS variables.
- [ ] Add/verify `fadeInUp 0.5s ease` and staggered children with 0.1s delay.


## Step 2: Premium Sidebar (Global)
- [x] Rewrite `src/components/Sidebar.jsx` to match exact sidebar spec (desktop structure + branding + nav + right-edge glow line + bottom user block).

  - Fixed 260px, exact gradient, Traveloop logo + indigo T badge
  - Nav items 44px height, padding 12px, radius 8px, active state with indigo left border 3px
  - Right-edge 1px glowing indigo line
  - Bottom avatar/name/email + logout hover red
  - Mobile: convert to bottom navigation bar with 5 icons

## Step 3: Page 1 - Login/Signup
- [ ] Refine `src/pages/Login.jsx` to match split-screen spec perfectly.

## Step 4: Page 2 - Dashboard
- [ ] Refine `src/pages/Dashboard.jsx` hero, stats cards, quick actions, recent trips, trending.

## Step 5: Page 3 - My Trips
- [ ] Refine `src/pages/MyTrips.jsx` header/search/filter pills and trip card hover/actions + empty state.

## Step 6: Remaining Pages
- [ ] CreateTrip: multi-step progress + live preview
- [ ] Explore Cities: hero/search/filter pills + grid hover overlay
- [ ] Activities: masonry + slide-over details drawer
- [ ] Budget: Recharts premium charts
- [ ] Packing Checklist: SVG ring + accordion + progress
- [ ] Profile/Settings: tabs + editable profile
- [ ] Admin Dashboard: KPIs + charts + user table
- [ ] Shared Itinerary: public no-sidebar page + timeline

## Step 7: Performance & QA
- [ ] Ensure React.lazy/Suspense across all pages.
- [ ] Ensure skeleton loaders and error states for all fetches.
- [ ] Debounce search inputs (300ms) and memoize heavy renders.
- [ ] Verify routing/protected routes.
- [ ] Mobile: ensure 375px layout works.

