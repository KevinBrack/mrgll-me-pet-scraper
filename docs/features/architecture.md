# Architecture Design

## System Components

### Current: Pet Data Scraper (This Repository)
- Purpose: Data collection and AI content generation
- Responsibilities:
  - Fetch and store pet data from Blizzard API
  - Scrape pet images from WarcraftPets
  - Generate battle narratives
  - Create image prompts
  - Maintain pet database

### Planned: Web Application (New Repository)
- Purpose: User interface and battle generation
- Key Requirements:
  - Single button proof of concept
  - Display battle results (title, story, image)
  - Simple, focused interface
  - Quick response times

## Key Decisions Needed

### 1. Data Access Pattern
Options to consider:
- Direct database access from web app
- API layer in scraper service
- Separate API service
- Shared database with clear boundaries

### 2. Image Handling
Questions to address:
- Where to store generated images?
- How to handle image generation queue?
- Caching strategy for common battles
- Delivery optimization

### 3. Battle Generation Flow
Need to decide:
- Where does pet selection happen?
- How to handle generation timeouts?
- Fallback content strategy
- Progress indication method

### 4. State Management
Consider:
- What state needs to be persisted?
- How to handle generation progress?
- Error state management
- Loading state handling

## Discussion Points

### Immediate Architecture Needs
1. How will the web app access pet data?
2. Where will battle generation logic live?
3. How to handle image generation queue?
4. What's the simplest way to store/serve images?

### Future Considerations
1. How will this architecture scale?
2. What parts need to be most flexible?
3. Where might bottlenecks occur?
4. What security concerns need addressing?

## Initial Thoughts

### Simplest MVP Architecture
1. Scraper (This Repo):
   - Continues current data collection
   - Provides simple API for pet data
   - Handles battle generation
   - Manages image creation

2. Web App (New Repo):
   - Single page application
   - Calls scraper API for battles
   - Displays results
   - Handles loading states

### Open Questions
1. Should battle generation be synchronous or async?
2. How to handle failed generations?
3. What metrics do we need to track?
4. How to optimize image delivery?

## Next Steps
1. Finalize data access pattern
2. Design basic API contract
3. Determine image storage solution
4. Plan deployment strategy
