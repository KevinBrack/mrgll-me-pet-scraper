# API Documentation

## Base URL

All endpoints are prefixed with `/api/blizzard`, `/api/warcraftpets`, or `/api/prompts`.

## Authentication

The application handles Blizzard API authentication internally using client credentials flow. You need to configure the following environment variables:

-   `BLIZZARD_CLIENT_ID`: Your Blizzard API client ID
-   `BLIZZARD_CLIENT_SECRET`: Your Blizzard API client secret
-   `OPENROUTER_API_KEY`: Your OpenRouter API key for AI-powered content generation

## Rate Limiting

The Blizzard endpoint implements rate limiting based on Blizzard's API constraints. Multiple requests in quick succession may be throttled.

The Warcraftpets endpoints implement a delay between requests to avoid overwhelming their server.

OpenRouter endpoints are subject to OpenRouter's rate limits and quotas based on your API key.

## Error Handling

All endpoints return appropriate HTTP status codes:

-   200: Success
-   400: Bad Request (invalid parameters)
-   404: Not Found (pet, image, or art style not found)
-   500: Server error

Error responses include a message explaining what went wrong.

## Data Updates

-   Blizzard pet data is fetched fresh with each API call
-   Warcraftpets image data is stored persistently and checked for duplicates
-   Generated prompts are stored in app_prompts_pet_image table
-   Batch processing skips pets that already have prompts for the specified art style and image source
