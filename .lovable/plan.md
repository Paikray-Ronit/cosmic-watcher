

# 🚀 Cosmic Watch - Implementation Plan

## Project Vision
A NASA mission control-inspired platform for real-time Near-Earth Object (NEO) monitoring with 3D orbital visualization, personalized asteroid tracking, and risk analysis.

---

## Phase 1: Foundation & Authentication
**Goal:** Set up the core infrastructure and user authentication

### Features:
- **User Authentication**
  - Email/password registration and login
  - User profile with customizable preferences (units, alert settings)
  - Protected routes for authenticated features

- **Design System**
  - NASA-inspired dark theme with mission control aesthetics
  - Grid-based layouts, data panels, and technical typography
  - Red accent colors for alerts/hazardous indicators
  - Terminal-style displays for real-time data

---

## Phase 2: NASA API Integration & Dashboard
**Goal:** Fetch live asteroid data and display a mission control-style dashboard

### Features:
- **NASA NeoWs API Integration**
  - Edge function to fetch asteroid feed by date range
  - Edge function to get specific asteroid details
  - Caching layer to store fetched data and respect rate limits

- **Main Dashboard (Mission Control View)**
  - Status panels showing today's stats (total NEOs, hazardous count, closest approach)
  - Real-time asteroid feed with sortable/filterable data grid
  - Quick filters: All objects, Hazardous only, Within 1 Lunar Distance
  - Risk distribution chart (showing breakdown by threat level)
  - Upcoming close approaches timeline

---

## Phase 3: Risk Analysis Engine
**Goal:** Calculate and display risk scores for asteroids

### Features:
- **Risk Scoring Algorithm**
  - Hazardous status weighting (40%)
  - Diameter scoring based on estimated size (25%)
  - Miss distance scoring - closer = higher risk (25%)
  - Relative velocity factor (10%)
  
- **Risk Categories Display**
  - Critical (80-100): Red alert indicators
  - High (60-79): Orange warning indicators
  - Moderate (40-59): Yellow caution indicators
  - Low (0-39): Green safe indicators

- **NEO Detail Page**
  - Complete asteroid profile (name, designation, magnitude)
  - Physical characteristics panel
  - Close approach history table
  - Risk score breakdown with visual indicators

---

## Phase 4: 3D Orbital Visualization
**Goal:** Interactive 3D view of Earth and asteroid trajectories

### Features:
- **3D Solar System View (using React Three Fiber)**
  - Earth model with accurate scale reference
  - Moon orbit for lunar distance context
  - Asteroid trajectory paths
  - Close approach visualization
  
- **Interactive Controls**
  - Orbit controls (rotate, zoom, pan)
  - Toggle between different asteroids
  - Time slider to see approach over time
  - Scale indicators and distance markers

---

## Phase 5: Watchlist & Alerts
**Goal:** Personalized asteroid tracking with notifications

### Features:
- **Watchlist Management**
  - Add/remove asteroids to personal watchlist
  - Set custom alert thresholds (distance, date range)
  - Enable/disable alerts per asteroid
  
- **Alert System**
  - Background job to check watched asteroids for upcoming approaches
  - In-app notification center
  - Alert history with filtering
  - Visual indicators for active alerts on dashboard

---

## Phase 6: Browse & Search
**Goal:** Explore the full NASA asteroid catalog

### Features:
- **Asteroid Catalog Browser**
  - Paginated list of all NEOs
  - Advanced search and filtering (size, date, hazardous status)
  - Sort by various criteria
  - Quick-add to watchlist from search results

---

## Database Schema

### Tables:
1. **profiles** - Extended user data and preferences
2. **watched_asteroids** - User's tracked asteroids with alert settings
3. **alert_history** - Record of triggered alerts
4. **cached_neos** - Cached asteroid data from NASA API

---

## Technical Architecture

- **Frontend:** React with TypeScript, Tailwind CSS (dark theme), Recharts for charts
- **3D Visualization:** React Three Fiber + Three.js
- **Backend:** Supabase Edge Functions for NASA API integration
- **Database:** Supabase PostgreSQL with Row Level Security
- **Auth:** Supabase Authentication
- **State:** TanStack Query for data fetching & caching

---

## Design Preview

| Component | Style |
|-----------|-------|
| Background | Deep space dark (#0a0a0f) |
| Panels | Grid-bordered data modules |
| Typography | Monospace for data, clean sans for UI |
| Alerts | Red glow effects for hazardous |
| Charts | Green/amber/red color coding |
| 3D Scene | Dark space with glowing orbital paths |

---

## MVP Deliverables
1. ✅ User authentication (login/signup)
2. ✅ NASA API integration with caching
3. ✅ Mission control dashboard with live asteroid feed
4. ✅ Risk analysis calculations and display
5. ✅ 3D orbital visualization (Earth + asteroid paths)
6. ✅ Watchlist functionality
7. ✅ Alert system with notifications
8. ✅ Browse/search asteroid catalog

