# Prompts Endpoints

## POST /api/prompts/narrative

Generates an AI-powered battle narrative for two pets.

### Request Body

```typescript
interface PetAbility {
    name: string;
    description: string;
}

interface Pet {
    name: string;
    description: string;
    abilities: PetAbility[];
}

interface GenerateNarrativeRequest {
    pet1: Pet;
    pet2: Pet;
}
```

### Response Format

```typescript
interface BattleNarrativeResponse {
    title: string; // Epic one-line battle summary
    description: string; // Detailed battle narrative
    imagePrompt: string; // Generated image prompt for the battle
}
```

### Success Response Example

```json
{
    "title": "Murkastrasza's Living Flame Ignites the Halls of Valor",
    "description": "Within the golden halls of Odyn's domain, the air crackled with arcane energy as Murkastrasza, descendant of the mighty Red Dragonflight...",
    "imagePrompt": "A baby dragon with shimmering magenta scales and golden armor unleashes a brilliant burst of magical flame..."
}
```

## POST /api/prompts/image

Generates an AI-powered image prompt for a specific pet.

### Request Body

```typescript
interface GenerateImagePromptRequest {
    petId: number;
    imageSource?: string; // defaults to 'warcraftpets_images'
    artStyle?: string; // defaults to 'chibi'
}
```

### Response Format

```typescript
interface GenerateImagePromptResponse {
    imagePrompt: string;
    pet: {
        id: number;
        name: string;
        description: string;
        // ... other pet fields
    };
    imageData: {
        pet_id: number;
        pet_url: string;
        pet_image_url: string;
    };
    artStyle: {
        id: number;
        name: string;
        description: string;
    };
    promptRecord: {
        id: number;
        pet_id: number;
        art_style_id: number;
        image_source_table: string;
        image_source_url: string;
        generated_prompt: string;
        original_description: string;
        metadata: {
            pet_name: string;
            art_style_name: string;
            source_pet_url: string;
        };
    };
}
```

## POST /api/prompts/image/batch

Batch generates image prompts for multiple pets.

### Request Body

```typescript
interface BatchGenerateImagePromptsRequest {
    batchSize?: number; // defaults to 10
    imageSource?: string; // defaults to 'warcraftpets_images'
    artStyle?: string; // defaults to 'chibi'
}
```

### Response Format

```typescript
interface BatchGenerateImagePromptsResponse {
    processed: number; // Total number of pets processed
    successful: number; // Number of successful generations
    failed: number; // Number of failed generations
    results: Array<{
        success: boolean;
        pet_id: number;
        pet_name: string;
        promptRecord?: {
            // Same as promptRecord in single generation
        };
        error?: string; // Present only if success is false
    }>;
}
```

### Success Response Example

```json
{
    "processed": 10,
    "successful": 10,
    "failed": 0,
    "results": [
        {
            "success": true,
            "pet_id": 39,
            "pet_name": "Mechanical Squirrel",
            "promptRecord": {
                "id": 1,
                "pet_id": 39,
                "art_style_id": 1,
                "generated_prompt": "A whimsical mechanical creature..."
                // ... other fields
            }
        }
        // ... more results
    ]
}
