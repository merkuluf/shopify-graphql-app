# Fullstack Application - Shopify Data Integration

This fullstack application demonstrates an integration with Shopify's GraphQL API. The server fetches product information from a Shopify store, saves it to a database using Prisma, and then serves this data to a frontend client built with React. The frontend displays the data in a grid format.

## Features

- **Server-Side Data Fetching**: Fetches product data from Shopify using GraphQL.
- **Database Integration**: Utilizes Prisma ORM for database operations.
- **React Frontend**: Displays the fetched data in an organized grid layout.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- A PostgreSQL database
- Shopify store access

### Installation

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/merkuluf/shopify-graphql-app/]
   cd [shopify-graphql-app]

2. **Install dependencies and .env for server:**

   ```bash
   cd server
   npm install
   DATABASE_URL="postgresql://..."
   SHOPIFY_TOKEN="shpat_..."

3. **Install dependencies for client**
   
   ```bash
   cd ../client
   npm install

3. **Run database migration:**

   ```bash
   cd ..
   npx prisma migrate dev

4. **Run application:**

   ```bash
   npm run dev
   cd server
   node index.js
   cd ../client
   npm run dev

5. **Usage:**

Once both the server and client are running, navigate to http://localhost:3000 in your web browser to view the React frontend displaying the products in a grid.