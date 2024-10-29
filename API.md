# API Documentation

## Base URL

All endpoints are prefixed with `/api/blizzard`, `/api/warcraftpets`, or `/api/prompts`.

## Authentication

The application handles Blizzard API authentication internally using client credentials flow. You need to configure the following environment variables:

-   `BLIZZARD_CLIENT_ID`: Your Blizzard API client ID
-   `BLIZZARD_CLIENT_SECRET`: Your Blizzard API client secret
-   `OPENROUTER_API_KEY`: Your OpenRouter API key for AI-powered content generation

[Previous Blizzard and Warcraftpets sections remain unchanged...]

## Prompts Endpoints

### POST /api/prompts/narrative

Generates an AI-powered battle narrative for two pets.

#### Request Body

```typescript
{
    pet1: string; // Name of the first pet
    pet2: string; // Name of the target pet
    ability: string; // Name of the ability being used
}
```

#### Response Format

```typescript
{
    narrative: string; // Generated battle narrative
}
```

#### Success Response Example

```json
{
    "narrative": "With eyes gleaming with determination, Murkastrasza channels ancient draconic energy into a brilliant Living Flame, sending it spiraling towards Stinker in a dazzling display of magical prowess. The tiny dragon's attack illuminates the battlefield with a warm, ethereal glow, creating a spectacular moment of pet battle glory."
}
```

#### Error Response Example

```json
{
    "error": "Failed to generate battle narrative"
}
```

### POST /api/prompts/image

Generates an AI-powered image prompt for a pet.

#### Request Body

```typescript
{
    pet: string; // Name of the pet
    description: string; // Base description of the pet
}
```

#### Response Format

```typescript
{
    imagePrompt: string; // Generated image prompt
}
```

#### Success Response Example

```json
{
    "imagePrompt": "A charming chibi-style baby dragon with magenta-red scales that shimmer like precious gems. The dragon strikes a playful pose, with tiny wings spread wide and golden eyes sparkling with mischief. Adorned with delicate golden armor accents that catch the light, the dragon's expression is warm and friendly. The scene is set in a soft, warm lighting that highlights the dragon's cute features and creates a gentle glow around its form."
}
```

#### Error Response Example

```json
{
    "error": "Failed to generate image prompt"
}
```

## Rate Limiting

The Blizzard endpoint implements rate limiting based on Blizzard's API constraints. Multiple requests in quick succession may be throttled.

The Warcraftpets endpoints implement a delay between requests to avoid overwhelming their server.

OpenRouter endpoints are subject to OpenRouter's rate limits and quotas based on your API key.

## Error Handling

All endpoints return appropriate HTTP status codes:

-   200: Success
-   400: Bad Request (invalid parameters)
-   500: Server error

Error responses include a message explaining what went wrong.

## Data Updates

-   Blizzard pet data is fetched fresh with each API call. Consider implementing a caching strategy if you need to call this endpoint frequently.
-   Warcraftpets image data is stored persistently and checked for duplicates before processing.
-   OpenRouter prompts are generated on-demand and not stored.
