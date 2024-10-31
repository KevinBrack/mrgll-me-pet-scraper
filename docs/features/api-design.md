# Battle Generation API Design

## Core Endpoint: Generate Battle

### POST /api/battles/generate
Generates a complete battle scene including narrative and image.

#### Simple Version (MVP)
```typescript
// Request
{
  // Optional - if not provided, randomly select two pets
  pet1Id?: number;
  pet2Id?: number;
}

// Response
{
  title: string;          // Epic one-line battle summary
  story: string;          // Detailed battle narrative
  imageUrl: string;       // URL to the generated battle scene
  pets: {
    pet1: {
      id: number;
      name: string;
      description: string;
    };
    pet2: {
      id: number;
      name: string;
      description: string;
    };
  };
  metadata: {
    generatedAt: string;
    generationTimeMs: number;
  };
}
```

#### Error Responses
```typescript
// 400 Bad Request
{
  error: "Invalid pet ID" | "Pet not found";
  details?: string;
}

// 500 Internal Error
{
  error: "Battle generation failed";
  details?: string;
}

// 503 Service Unavailable
{
  error: "Generation service unavailable";
  retryAfter?: number;  // seconds
}
```

## Supporting Endpoints

### GET /api/pets/random
Get random pets for battle generation.

```typescript
// Response
{
  pets: [
    {
      id: number;
      name: string;
      description: string;
    },
    {
      id: number;
      name: string;
      description: string;
    }
  ]
}
```

### GET /api/battles/:id
Retrieve a previously generated battle.

```typescript
// Response
// Same as generate endpoint response
```

## Considerations

### Rate Limiting
- Implement token bucket algorithm
- Consider user-based limits
- Add rate limit headers:
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 99
  X-RateLimit-Reset: 1635724800
  ```

### Caching Strategy
- Cache battle results by pet combination
- Cache images separately
- Consider cache invalidation rules
- Add cache headers:
  ```
  Cache-Control: public, max-age=3600
  ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
  ```

### Generation Progress
For longer operations, consider WebSocket or Server-Sent Events:
```typescript
// Progress updates
{
  status: "generating" | "complete" | "failed";
  step: "narrative" | "image" | "complete";
  progress: number;  // 0-100
  estimatedTimeRemaining?: number;  // seconds
}
```

### Future Enhancements
- Battle history
- Favorite combinations
- Style preferences
- Custom narratives
- Battle collections

## Security Considerations
- API key authentication
- Rate limiting per key
- Input validation
- Image size limits
- Content moderation

## Performance Goals
- Battle generation: < 3s
- Image generation: < 30s
- Random pet selection: < 100ms
- Cache hit response: < 50ms

## Monitoring Needs
- Generation success rate
- Average generation time
- Cache hit ratio
- Error rates by type
- API usage patterns
