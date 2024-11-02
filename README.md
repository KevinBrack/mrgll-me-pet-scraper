# MRGLL.ME Pet Scraper

A TypeScript/Node.js application that fetches and stores World of Warcraft battle pet data from the Blizzard API, with AI-powered content generation capabilities.

## Features

-   Fetches complete battle pet data from Blizzard's API
-   Stores detailed pet information in a SQLite database (development) or PostgreSQL (production)
-   Automatic OAuth token management using client credentials
-   TypeScript for type safety and better developer experience
-   Batch scraping of pet images from Warcraftpets.com with configurable limits
-   Comprehensive pet abilities system:
    -   Fetches and stores all pet abilities from Blizzard's API
    -   Caches ability details and icons for quick access
    -   Maintains relationships between pets and their abilities
-   Battle location management:
    -   AI-generated lore for battle arenas
    -   Dynamic image prompts for location visualization
    -   Rich descriptions of battle environments
-   AI-powered content generation through OpenRouter API:
    -   Dynamic battle narratives between pets
    -   Detailed image prompts for pet visualizations
    -   Batch processing of image prompts with progress tracking
    -   Art style customization with stored templates
    -   Location-specific battle scene generation

## Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   SQLite (development) or PostgreSQL (production)
-   OpenRouter API key for AI content generation

## Development Setup

1. Clone the repository:

```bash
git clone https://github.com/KevinBrack/mrgll-me-pet-scraper.git
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

# Required OpenRouter API key
OPENROUTER_API_KEY=your_openrouter_api_key

# Optional database configuration for production
DATABASE_URL=postgresql://username:password@localhost:5432/mrgll-me
DB_HOST=localhost
DB_PORT=5432
DB_USER=username
DB_PASSWORD=password
```

5. Initialize development database:

```bash
npm run init-dev-db
```

This will:
- Check if a database already exists
- Run all migrations
- Seed the database with initial data

## Initial Seed Data

The development database comes pre-populated with five carefully selected pets, each with complete data including Blizzard info, Warcraftpets images, and AI-generated image prompts:

| ID | Name | Description |
|----|------|-------------|
| 39 | Mechanical Squirrel | The original battle pet engineer who thinks nuts and bolts count as trail mix |
| 40 | Bombay Cat | Has a retirement plan that involves being buried with royalty... talk about career goals! |
| 41 | Cornish Rex Cat | Attends tea parties but prefers to drink the tears of its enemies... how very sophisticated |
| 42 | Black Tabby Cat | Lives by the motto "nine lives to live, one life to give" - we're still not sure what that means |
| 43 | Orange Tabby Cat | The reason your furniture can't have nice things |

## Usage

1. Start the server:

```bash
npm start
```

2. The server will run on port 3000 by default.

## Documentation

- [API Documentation](docs/api/overview.md) - Detailed documentation of all API endpoints
- [Project Concept](docs/concepts/mrgll-me-concept.md) - Core concept and features of the AI-enhanced pet battle system

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

### Tables

The application uses the following main tables:

1. `blizzard_pets`: Stores detailed pet information from Blizzard's API
2. `warcraftpets_images`: Stores pet image URLs and page references from Warcraftpets.com
3. `prompts_art_styles`: Stores art style templates for image generation
4. `app_prompts_pet_image`: Stores generated image prompts with metadata
5. `blizzard_pet_abilities`: Stores pet abilities data including names, icons, and cached details from Blizzard's API
6. `app_battle_locations`: Stores battle arena locations with names, lore descriptions, and image generation prompts

## Code Standards

This project follows strict coding standards:

-   TypeScript for all code files
-   Express.js best practices
-   Comprehensive error handling
-   Input validation
-   Organized route structure
-   Environment-based configuration
-   Detailed API documentation
-   RESTful conventions
-   Consistent code style
-   Async/await for asynchronous operations

## License

MIT License - see LICENSE file for details
