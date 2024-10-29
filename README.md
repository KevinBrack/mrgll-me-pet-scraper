# MRGLL.ME Pet Scraper

A TypeScript/Node.js application that fetches and stores World of Warcraft battle pet data from the Blizzard API.

## Features

-   Fetches complete battle pet data from Blizzard's API
-   Stores detailed pet information in a SQLite database (development) or PostgreSQL (production)
-   Automatic OAuth token management using client credentials
-   TypeScript for type safety and better developer experience

## Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   SQLite (development) or PostgreSQL (production)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mrgll-me-pet-scraper.git
cd mrgll-me-pet-scraper
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:

```
# Required Blizzard API credentials
BLIZZARD_CLIENT_ID=your_client_id
BLIZZARD_CLIENT_SECRET=your_client_secret

# Optional database configuration for production
DATABASE_URL=postgresql://username:password@localhost:5432/mrgll-me
DB_HOST=localhost
DB_PORT=5432
DB_USER=username
DB_PASSWORD=password
```

5. Run database migrations:

```bash
npx knex migrate:latest
```

## Usage

1. Start the server:

```bash
npm start
```

2. The server will run on port 3000 by default.

## API Documentation

See [API.md](API.md) for detailed endpoint documentation.

## Development

1. Start the development server with auto-reload:

```bash
npm run dev
```

2. Run TypeScript compilation in watch mode:

```bash
npm run watch-ts
```

## Database

-   Development: SQLite database at `db/mrgll-me.sqlite3`
-   Production: PostgreSQL database (configure using environment variables)

### Migrations

-   Run migrations: `npx knex migrate:latest`
-   Rollback migrations: `npx knex migrate:rollback`
-   Create new migration: `npx knex migrate:make migration_name`

## License

MIT License - see LICENSE file for details
