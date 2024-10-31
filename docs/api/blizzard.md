# Blizzard Endpoints

## GET /api/blizzard/pets

Fetches pet data from the Blizzard API and stores it in the local database. This endpoint implements a streaming response to provide real-time progress updates during the data synchronization process.

### Response Format

The endpoint streams JSON responses in the following formats:

#### Progress Updates
```typescript
interface ProgressUpdate {
    status: "processing";
    processed: number;      // Number of pets processed so far
    total: number;         // Total number of pets to process
    current: string;       // Name of the current pet being processed
    percentage: number;    // Progress percentage (0-100)
    skipped?: boolean;     // Present if pet already exists in database
    new?: boolean;         // Present if pet was newly added
}
```

#### Final Response
```typescript
interface FinalResponse {
    status: "complete";
    message: string;           // Success message
    processed: number;         // Total number of pets processed
    newPetsAdded: number;     // Number of new pets added
    total: number;            // Total number of pets
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

Pets are stored in the `blizzard_pets` table with the following fields:

```typescript
interface BlizzardPet {
    id: number;
    name: string;
    href: string | null;
    battle_pet_type_id: number | null;
    battle_pet_type: string | null;
    battle_pet_type_name: string | null;
    description: string | null;
    is_capturable: boolean;
    is_tradable: boolean;
    is_battlepet: boolean;
    is_alliance_only: boolean;
    is_horde_only: boolean;
    source_type: string | null;
    source_name: string | null;
    icon: string | null;
    creature_id: number | null;
    creature_name: string | null;
    creature_href: string | null;
    is_random_creature_display: boolean;
    media_id: number | null;
    media_href: string | null;
    should_exclude_if_uncollected: boolean;
    abilities: string;        // JSON string of pet abilities
    media_assets: string;     // JSON string of media assets
}
```

### Notes

- The endpoint has a 5-minute timeout due to the potentially large amount of data being processed
- Progress updates are sent for both new and existing pets
- Progress is logged to the console at 25% intervals
- If a pet fails to process, the error is logged and the process continues with the next pet
- Existing pets are skipped to avoid duplicate entries
- The process is resilient to errors, continuing even if individual pets fail to process
