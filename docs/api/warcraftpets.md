# Warcraftpets Endpoints

## GET /api/warcraftpets/pet/:petId

Scrapes and stores pet image data from WarcraftPets.com for a specific pet ID. The endpoint first checks if the image already exists in the database before attempting to scrape.

### Parameters

- `petId` (path parameter): The numeric ID of the pet to scrape

### Response Format

```typescript
interface ScrapeResult {
    message: string;        // Status message about the operation
    data?: {               // Present if successful
        pet_id: number;    // The ID of the pet
        pet_url: string;   // The WarcraftPets.com URL for the pet
        pet_image_url: string; // URL of the pet's image
    };
    error?: boolean;       // Present if an error occurred
}
```

#### Success Response Example (Already Exists)
```json
{
    "message": "Pet image already exists",
    "data": {
        "pet_id": 123,
        "pet_url": "https://www.warcraftpets.com/?id=123",
        "pet_image_url": "https://www.warcraftpets.com/images/pets/123.jpg"
    }
}
```

#### Success Response Example (Newly Scraped)
```json
{
    "message": "Pet image record created",
    "data": {
        "pet_id": 123,
        "pet_url": "https://www.warcraftpets.com/?id=123",
        "pet_image_url": "https://www.warcraftpets.com/images/pets/123.jpg"
    }
}
```

### Error Responses

```typescript
// Invalid pet ID
{
    "error": "Invalid pet ID"
}

// Pet not found in Blizzard database
{
    "error": "Failed to scrape warcraftpets data"
    // Internal error: "No pet found with id: {petId}"
}

// Image scraping failed
{
    "error": "Failed to scrape warcraftpets data"
    // Internal error: "Could not find image for pet: {petName}"
}
```

## GET /api/warcraftpets/pets

Performs a batch scrape of pet images from WarcraftPets.com. The endpoint only attempts to scrape pets that don't already have images stored in the database.

### Query Parameters

- `limit` (optional): Maximum number of pets to scrape (default: 10)

### Response Format

```typescript
interface BatchScrapeResult {
    message: string;           // Status message about the operation
    stats: {
        total: number;         // Total number of pets processed
        successful: number;    // Number of successful scrapes
        failed: number;        // Number of failed scrapes
        timeElapsed: string;   // Total processing time in seconds
    };
    results: Array<{
        message: string;       // Status message for each pet
        data?: {              // Present for successful scrapes
            pet_id: number;
            pet_url: string;
            pet_image_url: string;
        };
        error?: boolean;       // Present for failed scrapes
    }>;
}
```

#### Success Response Example
```json
{
    "message": "Batch scrape completed for 10 pets",
    "stats": {
        "total": 10,
        "successful": 8,
        "failed": 2,
        "timeElapsed": "45.32 seconds"
    },
    "results": [
        {
            "message": "Pet image record created",
            "data": {
                "pet_id": 123,
                "pet_url": "https://www.warcraftpets.com/?id=123",
                "pet_image_url": "https://www.warcraftpets.com/images/pets/123.jpg"
            }
        },
        // ... more results
    ]
}
```

### Error Responses

```typescript
// Invalid limit value
{
    "error": "Invalid limit value"
}

// Server error
{
    "error": "Failed to scrape warcraftpets data"
}
```

### Implementation Details

- Uses Puppeteer in headless mode to scrape WarcraftPets.com
- Stores data in the `warcraftpets_images` table
- Checks for existing images before attempting to scrape
- Requires pets to exist in the `blizzard_pets` table first
- Uses a 30-second timeout for page loads and image detection
- Includes browser launch options for compatibility:
  - `--no-sandbox`
  - `--disable-setuid-sandbox`
  - `--disable-dev-shm-usage`
- Logs detailed progress and timing information to the console
- Continues processing remaining pets if individual scrapes fail
