# API Documentation

## Base URL

All endpoints are prefixed with `/api/blizzard` or `/api/warcraftpets`.

## Authentication

The application handles Blizzard API authentication internally using client credentials flow. You need to configure the following environment variables:

-   `BLIZZARD_CLIENT_ID`: Your Blizzard API client ID
-   `BLIZZARD_CLIENT_SECRET`: Your Blizzard API client secret

## Blizzard Endpoints

### GET /api/blizzard/pets

Fetches and stores all World of Warcraft battle pets.

#### Description

This endpoint:

1. Fetches the complete pet index from Blizzard's API
2. For each pet, fetches detailed information and media
3. Stores or updates the information in the database

#### Response Format

```typescript
{
    message: string; // Success/failure message
    count: number; // Number of pets processed
}
```

#### Success Response Example

```json
{
    "message": "Pet data successfully updated",
    "count": 1400
}
```

#### Error Response Example

```json
{
    "error": "Failed to fetch and store pets"
}
```

#### Database Schema

Each pet is stored in the `blizzard_pets` table with the following information:

```typescript
{
    id: number; // Primary key, Blizzard's pet ID
    name: string; // Pet name
    href: string; // API reference URL
    battle_pet_type_id: number; // Pet type ID
    battle_pet_type: string; // Pet type
    battle_pet_type_name: string; // Pet type name
    description: string; // Pet description
    is_capturable: boolean; // Whether pet can be captured
    is_tradable: boolean; // Whether pet can be traded
    is_battlepet: boolean; // Whether pet can battle
    is_alliance_only: boolean; // Alliance restriction
    is_horde_only: boolean; // Horde restriction
    source_type: string; // How to obtain the pet
    source_name: string; // Source name
    icon: string; // Icon reference
    creature_id: number; // Related creature ID
    creature_name: string; // Creature name
    creature_href: string; // Creature API reference
    is_random_creature_display: boolean;
    media_id: number; // Media reference ID
    media_href: string; // Media API reference
    should_exclude_if_uncollected: boolean;
    abilities: json; // Pet abilities array
    media_assets: json; // Media information
    created_at: timestamp; // Record creation time
    updated_at: timestamp; // Record update time
}
```

## Warcraftpets Endpoints

### GET /api/warcraftpets/pet/:petId

Scrapes image information for a specific pet from Warcraftpets.com.

#### Description

This endpoint:

1. Checks if the pet image already exists in the database
2. If not, scrapes the pet's page on Warcraftpets.com
3. Stores the pet's image URL and page URL
4. Returns either the existing or newly created record

#### Parameters

-   `petId`: The pet ID (from blizzard_pets table)

#### Response Format

```typescript
{
    message: string; // Success/failure message
    data: {
        pet_id: number; // Reference to blizzard_pets.id
        pet_url: string; // Warcraftpets.com URL for the pet
        pet_image_url: string; // URL to the pet's image
        created_at: timestamp; // Record creation time
        updated_at: timestamp; // Record update time
    }
}
```

#### Success Response Example

```json
{
    "message": "Pet image record created",
    "data": {
        "pet_id": 39,
        "pet_url": "https://www.warcraftpets.com/wow-pets/mechanical/mechanized-critters/mechanical-squirrel/",
        "pet_image_url": "https://cdn2.warcraftpets.com/images/pets/big/mechanical-squirrel.v29bbe74e0862df25c47cb54f4d9331ae4a91e074.jpg",
        "created_at": "2024-01-29T07:22:30.000Z",
        "updated_at": "2024-01-29T07:22:30.000Z"
    }
}
```

### GET /api/warcraftpets/pets

Batch scrapes image information for multiple pets from Warcraftpets.com.

#### Description

This endpoint:

1. Finds pets that don't have image records yet
2. Scrapes each pet's page on Warcraftpets.com
3. Stores the image URLs and page URLs
4. Returns results for all processed pets

#### Query Parameters

-   `limit`: (optional) Number of pets to process (default: 10)

#### Sample Request

To process 20 pets in a single batch:

```
GET /api/warcraftpets/pets?limit=20
```

To use the default limit of 10 pets:

```
GET /api/warcraftpets/pets
```

#### Response Format

```typescript
{
    message: string; // Success/failure message
    results: Array<{
        message: string;
        data: {
            pet_id: number;
            pet_url: string;
            pet_image_url: string;
            created_at: timestamp;
            updated_at: timestamp;
        };
    }>;
}
```

#### Sample Response

```json
{
    "message": "Batch scrape completed for 2 pets",
    "results": [
        {
            "message": "Pet image record created",
            "data": {
                "pet_id": 39,
                "pet_url": "https://www.warcraftpets.com/wow-pets/mechanical/mechanized-critters/mechanical-squirrel/",
                "pet_image_url": "https://cdn2.warcraftpets.com/images/pets/big/mechanical-squirrel.v29bbe74e0862df25c47cb54f4d9331ae4a91e074.jpg",
                "created_at": "2024-01-29T07:22:30.000Z",
                "updated_at": "2024-01-29T07:22:30.000Z"
            }
        },
        {
            "message": "Pet image record created",
            "data": {
                "pet_id": 40,
                "pet_url": "https://www.warcraftpets.com/wow-pets/beast/felines/bombay-cat/",
                "pet_image_url": "https://cdn2.warcraftpets.com/images/pets/big/bombay.vf0ae19a8bc7769c8a77a2a6ebaa3a7f353f4ae73.jpg",
                "created_at": "2024-01-29T07:23:30.000Z",
                "updated_at": "2024-01-29T07:23:30.000Z"
            }
        }
    ]
}
```

#### Database Schema

Pet images are stored in the `warcraftpets_images` table with the following information:

```typescript
{
    id: number; // Primary key
    pet_id: number; // Foreign key to blizzard_pets.id
    pet_url: string; // Full Warcraftpets.com URL for the pet
    pet_image_url: string; // URL to the pet's image
    created_at: timestamp; // Record creation time
    updated_at: timestamp; // Record update time
}
```

## Rate Limiting

The Blizzard endpoint implements rate limiting based on Blizzard's API constraints. Multiple requests in quick succession may be throttled.

The Warcraftpets endpoints implement a delay between requests to avoid overwhelming their server.

## Error Handling

All endpoints return appropriate HTTP status codes:

-   200: Success
-   400: Bad Request (invalid parameters)
-   500: Server error

Error responses include a message explaining what went wrong.

## Data Updates

-   Blizzard pet data is fetched fresh with each API call. Consider implementing a caching strategy if you need to call this endpoint frequently.
-   Warcraftpets image data is stored persistently and checked for duplicates before processing.
