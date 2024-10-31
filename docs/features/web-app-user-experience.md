# User Experience & Authentication

## Core Philosophy
Keep it simple and secure. No username/password storage, no personal data collection.

## Anonymous Experience

### Features Available Without Auth
- View random battle stories
- Generate new battles (rate limited)
- Switch themes
- Share battles via URL
- Download battle stories (MD/PDF)
- Toggle between languages (including Mrglglgl)

## Authentication

### Single Sign-On
- Google OAuth only
  - Simple
  - Secure
  - Widely used
  - No password storage
  - No personal data collection

### Enhanced Features for Authenticated Users
- Save favorite battles
- Higher rate limits for generation
- Theme preferences persistence
- Battle history

## Blizzard Integration

### Account Linking (Separate from Auth)
- Optional feature
- Links WoW account to show owned pets
- Read-only access
- No authentication through Blizzard
- Can unlink at any time

### Implementation
```typescript
interface BlizzardLink {
  userId: string;        // Google OAuth ID
  accessToken: string;   // Blizzard API token
  region: string;        // US, EU, etc.
  lastSync: Date;        // Last pet collection sync
}
```

## Rate Limiting

### Anonymous Users
- 10 battle generations per hour per IP
- 100 battle views per hour
- 50 theme switches per hour

### Authenticated Users
- 50 battle generations per hour
- Unlimited battle views
- Unlimited theme switches
- Priority generation queue

## Social Features

### Battle Sharing
- Direct URL sharing
- Twitter/X integration
- Discord rich embeds
- Reddit-friendly format

## Data Storage Philosophy

### What We Store
- Google OAuth ID (for auth)
- Theme preferences
- Battle history
- Blizzard API token (if linked)

### What We Don't Store
- Passwords
- Personal information
- Email addresses
- User metadata

## Implementation Notes

### Local Storage Structure
```typescript
// For anonymous users
interface LocalStorage {
  theme: string;
  language: string;
  soundEnabled: boolean;
  recentBattles: string[]; // battle IDs
  lastGenerationTime: number;
  generationCount: number;
}
```

### Security Considerations
- Rate limiting by IP and Google ID
- Input validation
- XSS prevention
- CORS configuration
- Secure token handling

## Error Handling

### User-Friendly Messages
```typescript
const errorMessages = {
  rateLimited: "Whoa there, champion! Time to catch your breath. Try again in {time}.",
  generateFailed: "The battle got away from us! Give it another shot.",
  authFailed: "Something went wrong with Google login. Mind trying again?",
  blizzardSync: "Couldn't sync with WoW. Your pets are being shy!"
};
```

## Analytics & Monitoring

### Key Metrics
- Battle generation success rate
- Theme popularity
- Language preferences
- Share conversion rate
- Blizzard account link rate

### Privacy-First Analytics
- Aggregate data only
- No personal information
- No user tracking
- Performance metrics only
