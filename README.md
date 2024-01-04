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
   git clone [your-repository-link]
   cd [your-repository-name]


2. **Install dependencies:**

   ```bash
   cd server
   npm install
   cd ../client
   npm install

3. **Set up environment variables:**

   DATABASE_URL="your-database-url"
   SHOPIFY_ACCESS_TOKEN="your-shopify-access-token"

4. **Run database migration:**

   ```bash
   npx prisma migrate dev

5. **Run application:**

   ```bash
   npm run dev
   cd ../server
   node index.js
