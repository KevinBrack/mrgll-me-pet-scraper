# API Design

## Core Endpoints

### Battles

```typescript
// Types
interface Battle {
  id: string;
  title: string;
  story: string;
  imageUrl: string;
  pets: Pet[];
  createdAt: string;
}

interface GenerateBattleResponse {
  battleId: string;
  status: 'pending' | 'completed' | 'failed';
  estimatedTime?: number;
}
```

#### Endpoints
```typescript
// Get random pre-generated battle
GET /api/battles/random
Response: Battle

// Get specific battle by ID
GET /api/battles/:id
Response: Battle

// Generate new battle
POST /api/battles/generate
Response: GenerateBattleResponse

// Get generation status
GET /api/battles/generate/:id/status
Response: {
  status: 'pending' | 'completed' | 'failed';
  progress?: number;
  battle?: Battle;
  error?: string;
}

// Download battle as markdown/PDF
GET /api/battles/:id/export
Query: { format: 'md' | 'pdf' }
Response: File
```

### Pets

```typescript
// Types
interface Pet {
  id: number;
  name: string;
  imageUrl: string;
  wowheadUrl: string;
}
```

#### Endpoints
```typescript
// Get pet details
GET /api/pets/:id
Response: Pet

// Search pets
GET /api/pets/search
Query: { q: string }
Response: Pet[]
```

### Themes

```typescript
// Types
interface Theme {
  id: 'bite-me' | 'blind-me' | 'mrgll-me';
  name: string;
  description: string;
  assets: {
    backgrounds: string[];
    icons: { [key: string]: string };
    sounds: { [key: string]: string };
  };
}
```

#### Endpoints
```typescript
// Get theme configuration
GET /api/themes/:id
Response: Theme

// Get theme-specific translations
GET /api/themes/:id/translations
Query: { locale: string }
Response: { [key: string]: string }

// Get theme assets
GET /api/themes/:id/assets
Query: { type: 'backgrounds' | 'icons' | 'sounds' }
Response: { urls: string[] }
```

## API Patterns

### Error Handling
```typescript
interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// Example error response
{
  "error": {
    "code": "BATTLE_NOT_FOUND",
    "message": "Battle with ID xyz not found",
    "details": { "battleId": "xyz" }
  }
}
```

### Rate Limiting
- 100 requests per minute per IP for general endpoints
- 10 battle generations per hour per user
- Unlimited access to static assets

### Caching Strategy
```typescript
// Cache-Control headers
battles/random: max-age=0, s-maxage=60
battles/:id: max-age=3600, s-maxage=86400
pets/*: max-age=86400, s-maxage=604800
themes/*: max-age=3600, s-maxage=86400
```

### Authentication
- Public access for viewing battles and pets
- Rate limiting by IP
- Future: User accounts for battle generation

## Integration with Existing Pet Scraper

### Data Flow
1. Pet scraper populates database with:
   - Pet information
   - Images
   - Wowhead references

2. Web app consumes this data via:
   - Direct database access
   - Cached API responses
   - Pre-generated static files

### Sync Strategy
1. Real-time updates not required
2. Hourly cache invalidation for pet data
3. Daily regeneration of static assets
4. Weekly full data sync

## Implementation Notes

### API Routes Structure
```
app/
└── api/
    ├── battles/
    │   ├── route.ts
    │   ├── random/
    │   │   └── route.ts
    │   ├── [id]/
    │   │   └── route.ts
    │   └── generate/
    │       └── route.ts
    ├── pets/
    │   ├── route.ts
    │   └── [id]/
    │       └── route.ts
    └── themes/
        ├── route.ts
        └── [id]/
            └── route.ts
```

### Example Implementation

```typescript
// app/api/battles/random/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const battle = await db.battle.findRandom();
    return NextResponse.json(battle);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch random battle'
        }
      },
      { status: 500 }
    );
  }
}
```

### Performance Optimizations

1. **Edge Functions**
   - Random battle selection
   - Theme asset serving
   - Translation delivery

2. **Static Generation**
   - Pre-generate popular battles
   - Cache pet data at build time
   - Generate static theme assets

3. **Streaming**
   - Progressive battle loading
   - Chunked story delivery
   - Real-time generation updates
