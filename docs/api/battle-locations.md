# Battle Locations Endpoints

## POST /api/battle-locations

Creates a new battle location with AI-generated lore description and image prompt.

### Request Body

```typescript
interface CreateBattleLocationRequest {
    name: string;        // Name of the location
    description: string; // Original description of the location
    image_url: string;   // Reference image URL for the location
}
```

### Response Format

```typescript
interface BattleLocation {
    id: number;
    name: string;
    lore: string;           // AI-generated lore description
    image_prompt: string;   // AI-generated image prompt
    created_at: string;     // ISO timestamp
    updated_at: string;     // ISO timestamp
}
```

### Success Response Example

```json
{
    "id": 1,
    "name": "Nagrand",
    "lore": "Nagrand stands as one of Draenor's most pristine territories, a vast expanse of rolling emerald plains and floating islands suspended by ancient shamanistic magic. The land pulses with primal energy from its towering crystalline spires to the sacred ancestral grounds where the elements themselves whisper ancient secrets...",
    "image_prompt": "A sweeping vista of endless emerald grasslands stretches to the horizon, punctuated by impossible floating islands suspended in the azure sky. Massive stone rings and crystalline formations emerge from the rolling hills while waterfalls cascade from the floating landmasses above...",
    "created_at": "2024-11-01T05:58:59.000Z",
    "updated_at": "2024-11-01T05:58:59.000Z"
}
```

### Error Responses

```typescript
// Missing required fields
{
    "error": "Missing required fields: name, description, and image_url are required"
}

// Failed to generate prompts
{
    "error": "Failed to create battle location"
}
```

### Implementation Details

- Uses OpenRouter API with Claude 3.5 Sonnet model for content generation
- Generates two distinct outputs:
  1. A lore description that expands the location's story using World of Warcraft terminology
  2. An image prompt that describes the scene in universal fantasy terms
- Stores data in the `app_battle_locations` table
- Automatically removes control characters from AI responses
- Includes detailed error logging for troubleshooting
- Uses a temperature of 0.7 for more creative location descriptions
- Maintains consistent narrative style across different locations
- Translates game-specific elements into generic fantasy equivalents for image prompts
- Focuses on environmental and atmospheric details suitable for battle scenes

### Database Schema

```typescript
interface AppBattleLocation {
    id: number;           // Auto-incrementing primary key
    name: string;         // Location name
    lore: string;         // AI-generated lore description
    image_prompt: string; // AI-generated image prompt
    created_at: Date;     // Creation timestamp
    updated_at: Date;     // Last update timestamp
}
```

### Notes

- The endpoint processes one location at a time
- Image prompts are designed to be platform-agnostic and suitable for any image generation service
- Lore descriptions maintain World of Warcraft terminology and references
- Each location gets a unique narrative treatment while maintaining consistent quality
- The system is designed to handle both existing and new locations through the seeding process
