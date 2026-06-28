# Content Forge Frontend

The dashboard and user-facing interface for **Content Forge AI**. This frontend is a high-performance Next.js 16 application built with React 19, utilizing the latest Server Actions for mutation, TanStack Query for state management, and Tailwind CSS v4 for styling.

---

## 🛠 Tech Stack Core Architecture

* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript 5
* **State & Data:** TanStack Query (Server State), TanStack Form (Type-safe forms)
* **UI Components:** Shadcn UI (Radix-driven)
* **Visualization:** Recharts (Analytical dashboard metrics)
* **Styling:** Tailwind CSS v4 (native PostCSS integration)
* **Utilities:** `date-fns`, `lucide-react`, `axios`, `zod`

---

## 📂 Project Directory Breakdown

```text
├── app/                          # App Router (Next.js 16)
│   ├── (authGroup)/              # Auth flows (Login, Register, OTP, etc.)
│   ├── (dashboard)/              # Protected workspace layouts
│   │   ├── (commonProtected)/    # User settings (Profile, Password)
│   │   ├── dashboard/            # Core user generation tools
│   │   └── manager/              # Admin-level oversight (Metrics, Templates)
│   └── (home)/                   # Marketing landing pages
├── components/
│   ├── modules/                  # Feature-specific domain components (Auth, Dashboard)
│   ├── shared/                   # Reusable UI primitives (Tables, Forms, Navbar)
│   └── ui/                       # Shadcn UI primitives
├── hooks/                        # Custom React logic (DataTable managers, State)
├── lib/                          # Global utilities, Axios instance, Auth/Token logic
├── services/                     # API Layer (communicating with the backend)
├── types/                        # TypeScript interface definitions
└── zod/                          # Frontend-side validation schemas

```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* `pnpm` (Workspace Manager)

### Installation & Local Setup

1. **Clone the Repository:**
```bash
git clone https://github.com/furqanRupom/content-forge-frontend.git
cd content-forge-frontend

```


2. **Install Dependencies:**
```bash
pnpm install

```


3. **Configure Environment:**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

```


4. **Run Development Environment:**
```bash
pnpm dev

```



---

## 🛠 Key Architecture Patterns

### 1. TanStack Ecosystem Integration

* **TanStack Query:** Handles all asynchronous data fetching with intelligent caching and synchronization, providing the `isLoading` and `isFetching` states used across the dashboard.
* **TanStack Form:** Manages complex form states in our Generation and Template management modules with built-in validation using `zod`.
* **Server-Managed Data Tables:** The custom `useServerManagedDataTable` hooks provide standardized filtering, pagination, and searching capabilities across all audit logs and template management lists.

### 2. Modular Architecture

* **Feature Modules:** By separating UI logic into `components/modules/`, we isolate the complexity of specific features (like `Manager/TemplatesManagement` or `User/GenerateContent`) from the core layout.
* **Service Layer:** All API interactions are strictly typed and encapsulated within `/services/`, ensuring the components remain agnostic of the underlying transport protocol.

### 3. Tailwind v4 Styling

* Utilizes Tailwind's latest architecture for optimized build performance and CSS utility consistency, allowing for tight integration with the Shadcn UI system.

---

## 🧪 Development Workflow

* `pnpm dev`: Starts the Next.js development server.
* `pnpm build`: Prepares the production-optimized build.
* `pnpm lint`: Runs ESLint to maintain code quality across the codebase.

---

## 🛣 API Integration Context

This frontend is designed to consume the **[Content Forge Backend](https://github.com/furqanRupom/content-forge-backend.git)**. Ensure the backend services are running locally on port `5000` for full end-to-end functionality of the dashboard metrics, generation pipeline, and authentication guards.