# Development Roadmap

## Current State (Scraper)
We have a solid foundation with:
- Blizzard API integration for pet data
- WarcraftPets image scraping
- AI-powered battle narratives
- Image prompt generation
- Basic database structure

## MVP Goal
Create a proof-of-concept battle story generator that demonstrates the core value proposition:
A single button that generates and displays:
- An engaging battle title
- A compelling short story
- An AI-generated battle scene image

## Architecture Discussion Points
- Separation of concerns between scraper and web application
- Data flow between components
- API design for battle generation
- Image storage and delivery
- State management needs

## Feature Priorities

### Phase 1: Battle Story Generator (Core Proof of Concept)
- [ ] Simple UI with single button
  - Randomly select two pets for battle
  - Generate narrative and image
  - Display results
  - Basic error handling

### Phase 2: Basic Pet Selection
- [ ] Minimal pet browsing
  - Simple list/grid view
  - Basic search
  - Select pets for battle

### Phase 3: Result Enhancement
- [ ] Improved battle presentation
  - Layout optimization
  - Image display improvements
  - Story formatting
  - Loading states

### Phase 4: Polish & Stability
- [ ] Error handling
- [ ] Loading states
- [ ] Performance optimization
- [ ] Basic analytics

## Architecture Considerations

### Scraper (Current Repository)
- Continue focusing on data collection
- Optimize pet data storage
- Enhance image scraping
- Improve prompt generation

### Web Application (New Repository)
- Minimal viable frontend
- Battle generation API
- Image storage solution
- Basic state management

## Success Criteria

### Technical
- [ ] <3s story generation
- [ ] <30s image generation
- [ ] Reliable pet data access
- [ ] Basic error recovery

### User Experience
- [ ] One-click battle generation
- [ ] Clear result presentation
- [ ] Intuitive pet selection (Phase 2)

## Risks & Mitigations
1. Image Generation Costs
   - Start with limited generations
   - Optimize prompt efficiency
   - Consider caching common battles

2. API Performance
   - Implement basic caching
   - Queue system for image generation
   - Clear loading states

3. Content Quality
   - Basic quality filters
   - Error handling for AI failures
   - Fallback content options

## Discussion Topics
1. Web Application Architecture
   - Framework selection
   - State management approach
   - API design
   - Deployment strategy

2. Data Flow
   - Pet data access patterns
   - Image storage and delivery
   - Battle generation workflow
   - Caching strategy

3. Future Considerations
   - Scaling strategy
   - Feature expansion
   - User accounts
   - Social features
