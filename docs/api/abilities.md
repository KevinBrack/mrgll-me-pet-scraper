# Pet Abilities Endpoints

## GET /api/abilities

Fetches and stores pet ability data from the Blizzard API. This endpoint implements a streaming response to provide real-time progress updates during the data synchronization process.

### Response Format

The endpoint streams JSON responses in the following formats:

#### Progress Updates
```typescript
interface ProgressUpdate {
    status: "processing";
    processed: number;      // Number of abilities processed so far
    total: number;         // Total number of abilities to process
    current: string;       // Name of the current ability being processed
    percentage: number;    // Progress percentage (0-100)
    skipped?: boolean;     // Present if ability already exists in database
    new?: boolean;         // Present if ability was newly added
}
```

#### Final Response
```typescript
interface FinalResponse {
    status: "complete";
    message: string;           // Success message
    processed: number;         // Total number of abilities processed
    newAbilitiesAdded: number; // Number of new abilities added
    total: number;            // Total number of abilities
    timeElapsed: string;      // Total processing time in seconds
}
```

#### Error Response
```typescript
interface ErrorResponse {
    error: string;            // Error message
}
```

### Database Schema

Abilities are stored in the `blizzard_pet_abilities` table with the following fields:

```typescript
interface BlizzardPetAbility {
    id: number;           // Primary key, matches Blizzard's ability ID
    name: string;         // Name of the ability
    icon: string;         // URL of the ability's icon
    details: string;      // JSON string of full ability details from Blizzard
    created_at: Date;     // Creation timestamp
    updated_at: Date;     // Last update timestamp
}
```

### Implementation Details

- Uses Blizzard's Game Data APIs to fetch:
  1. Complete index of pet abilities
  2. Detailed information for each ability
  3. Media assets (icons) for each ability
- Implements a 5-minute timeout for processing large datasets
- Provides real-time progress updates through chunked responses
- Skips existing abilities to avoid duplicate entries
- Stores full ability details as JSON for future reference
- Logs progress to console at 25% intervals
- Continues processing if individual abilities fail
- Maintains error logging for troubleshooting

### Notes

- The endpoint processes the complete set of pet abilities
- Icon URLs are stored for quick access without additional API calls
- Full ability details are cached to reduce future API requests
- Progress updates include both new and skipped abilities
- The process is resilient to individual ability failures
