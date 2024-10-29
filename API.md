# API Documentation

## Base URL

All endpoints are prefixed with `/api/blizzard`.

## Authentication

The application handles Blizzard API authentication internally using client credentials flow. You need to configure the following environment variables:

-   `BLIZZARD_CLIENT_ID`: Your Blizzard API client ID
-   `BLIZZARD_CLIENT_SECRET`: Your Blizzard API client secret

## Endpoints

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

## Rate Limiting

The endpoint implements rate limiting based on Blizzard's API constraints. Multiple requests in quick succession may be throttled.

## Error Handling

All endpoints return appropriate HTTP status codes:

-   200: Success
-   500: Server error

Error responses include a message explaining what went wrong.

## Data Updates

Pet data is fetched fresh with each API call. Consider implementing a caching strategy if you need to call this endpoint frequently.
