# Existing Features

## Data Collection & Storage

### Blizzard Pet Data Integration
- OAuth token management with client credentials flow
- Complete battle pet data fetching from Blizzard API
- Structured storage in SQLite (dev) or PostgreSQL (prod)
- Detailed pet information including abilities, stats, and metadata

### WarcraftPets Image Scraping
- Automated image URL extraction using Puppeteer
- Rate-limited scraping to respect the source website
- Persistent storage of pet images and page references
- Duplicate checking and skip functionality

## AI Content Generation

### Battle Narratives
- Dynamic generation of pet battle stories
- Incorporation of pet abilities and characteristics
- Epic one-line battle summaries
- Detailed battle scene descriptions

### Image Prompts
- Conversion of pet visuals into detailed prompts
- Art style customization through templates
- Batch processing capabilities
- Progress tracking and error handling

## Database Structure

### Tables
1. `blizzard_pets`
   - Core pet information from Blizzard
   - Battle pet types and abilities
   - Source information and creature details

2. `warcraftpets_images`
   - Pet image URLs
   - Source page references
   - Association with Blizzard pet IDs

3. `prompts_art_styles`
   - Art style templates
   - Style descriptions and parameters
   - Customization options

4. `app_prompts_pet_image`
   - Generated image prompts
   - Associated metadata
   - Art style references

## Development Features

### Environment Management
- Development/Production configuration
- Environment variable handling
- Database connection management

### API Structure
- RESTful endpoint design
- Route organization by domain
- Comprehensive error handling
- Progress streaming for long operations

### TypeScript Integration
- Type safety across the application
- Interface definitions for API responses
- Type checking for database operations

## Testing & Development Tools
- Database initialization scripts
- Migration management
- Seeded test data with sample pets
- Development auto-reload functionality

## Next Steps
*To be expanded in roadmap.md*
- [ ] Define MVP feature set
- [ ] Prioritize development tasks
- [ ] Identify potential challenges
- [ ] Set development milestones
