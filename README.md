# Bespoke Clothing Dashboard

A feature-rich, interactive dashboard for a fictional bespoke clothing company built with Next.js, React, and Material-UI.

## Features

- Customer data table with pagination, sorting, and filtering
- Expandable rows showing order details
- Inline editing for customer status and garment measurements
- Responsive design with Material-UI components
- Mock API backend with realistic data

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Material-UI (MUI)
- date-fns
- @faker-js/faker

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bespoke-dashboard.git
   cd bespoke-dashboard

2. Install Dependencies:
    ```bash
    npm install

3. run the development server:
    ```bash
    npm run dev

4. Open your browser and visit:
    ```text
    http://localhost:3000


## Project Structure
    
    src/
    ├── app/                  # Next.js app router
    │   ├── api/              # API routes
    │   └── (dashboard)/      # Main dashboard pages
    ├── components/           # Reusable components
    ├── lib/                  # Utilities and types
    ├── styles/               # Global styles
    └── types/                # TypeScript types

## Available Scripts
- npm run dev: Start development server

- npm run build: Create production build

- npm start: Start production server

- npm run lint: Run ESLint