# Image Handling with Vercel Blob Storage

## Overview
Using Vercel Blob Storage for its seamless integration with our Next.js app and zero-config CDN distribution.

## Implementation

### 1. Setup
```bash
npm install @vercel/blob
```

### 2. Environment Variables
```env
BLOB_READ_WRITE_TOKEN=your_token_here
```

### 3. Storage Structure
```
battles/
├── generated/           # AI-generated battle images
├── pets/               # Pet reference images
└── themes/             # Theme-specific assets (murloc SVGs, etc.)
```

### 4. Core Functions
```typescript
import { put, del, list } from '@vercel/blob';

// Upload image
async function uploadBattleImage(file: File) {
  const blob = await put(`battles/generated/${file.name}`, file, {
    access: 'public',
    addRandomSuffix: true
  });
  return blob.url;
}

// Delete image
async function deleteBattleImage(url: string) {
  await del(url);
}

// List images
async function listBattleImages() {
  const { blobs } = await list();
  return blobs;
}
```

### 5. Integration with next/image
```typescript
import Image from 'next/image';

function BattleImage({ url }: { url: string }) {
  return (
    <Image
      src={url}
      alt="Battle Scene"
      width={800}
      height={600}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

## Benefits
- Native Vercel integration
- Automatic CDN distribution
- Simple API
- Zero configuration needed
- Pay-as-you-go pricing
- Works seamlessly with next/image
