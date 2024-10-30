import axios from "axios";
import dotenv from "dotenv";
import { getArtStyle } from "../db/prompts";

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
const DEFAULT_ART_STYLE = "chibi";

if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is required");
}

interface OpenRouterResponse {
    choices: {
        message: {
            content: string;
        };
    }[];
}

interface BattleNarrativeResponse {
    title: string;
    description: string;
    imagePrompt: string;
}

interface PetAbility {
    name: string;
    description: string;
}

interface Pet {
    name: string;
    description: string;
    abilities: PetAbility[];
}

class OpenRouterService {
    private readonly headers;

    constructor() {
        this.headers = {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://mrgll.me",
            "Content-Type": "application/json",
        };
    }

    async generateBattleNarrative(
        pet1: Pet,
        pet2: Pet
    ): Promise<BattleNarrativeResponse> {
        try {
            const response = await axios.post<OpenRouterResponse>(
                `${OPENROUTER_BASE_URL}/chat/completions`,
                {
                    model: "anthropic/claude-3.5-sonnet",
                    messages: [
                        {
                            role: "user",
                            content: `Create an epic World of Warcraft pet battle scene using these two pets and their abilities. Format the response in JSON with three fields:

Pet 1: ${pet1.name}
Description: ${pet1.description}
Abilities: ${pet1.abilities
                                .map((a) => `${a.name}: ${a.description}`)
                                .join("\n")}

Pet 2: ${pet2.name}
Description: ${pet2.description}
Abilities: ${pet2.abilities
                                .map((a) => `${a.name}: ${a.description}`)
                                .join("\n")}

Create a response in this format:
{
  "title": A single, epic sentence describing the battle using World of Warcraft terminology and lore references (max 10 words),
  "description": A short story (2-3 paragraphs) about a battle between these pets. Choose appropriate abilities from their available movesets to create an engaging narrative. Embrace World of Warcraft lore, locations, and terminology to make it feel authentic to the game world. Make it dramatic and engaging.
  "imagePrompt": A detailed prompt that captures the most visually striking moment from your battle story. Important: For this field only, describe the scene and characters in generic fantasy terms without any game-specific references. Focus on the physical appearance, actions, and magical effects in a way that could work for any fantasy setting.
}

Remember: 
- Choose abilities that would create visually interesting moments
- Embrace WoW lore in the title and description
- Keep the image prompt generic and suitable for image generation
- Focus on the most dramatic moment for the image prompt`,
                        },
                    ],
                    temperature: 0.25,
                    top_p: 1,
                    repetition_penalty: 1,
                },
                { headers: this.headers }
            );

            // Parse the JSON response from Claude
            const content = response.data.choices[0].message.content;
            try {
                const parsedContent = JSON.parse(content);
                return {
                    title: parsedContent.title,
                    description: parsedContent.description,
                    imagePrompt: parsedContent.imagePrompt,
                };
            } catch (parseError) {
                console.error(
                    "Error parsing battle narrative JSON:",
                    parseError
                );
                throw new Error("Failed to parse battle narrative response");
            }
        } catch (error) {
            console.error("Error generating battle narrative:", error);
            throw new Error("Failed to generate battle narrative");
        }
    }

    async generateImagePrompt(
        description: string,
        artStyleName: string = DEFAULT_ART_STYLE
    ): Promise<string> {
        try {
            // Fetch the art style from the database
            const artStyle = await getArtStyle(artStyleName);
            if (!artStyle) {
                throw new Error(`Art style '${artStyleName}' not found`);
            }

            const response = await axios.post<OpenRouterResponse>(
                `${OPENROUTER_BASE_URL}/chat/completions`,
                {
                    model: "anthropic/claude-3.5-sonnet",
                    messages: [
                        {
                            role: "user",
                            content: `Create a character-focused image generation prompt based on this description. Return ONLY a JSON object with a single "prompt" field containing your response.

Original description to adapt: ${description}

The prompt should:
1. Translate game-specific elements into generic fantasy equivalents
2. Focus purely on visual characteristics and personality
3. Use this art style: ${artStyle.description}

Focus ONLY on these elements:
- Physical features and proportions (size, shape, distinctive characteristics)
- Materials and textures (scales, fur, armor, etc.)
- Character's expression and personality
- Lighting effects and any magical auras
- Pose and character presentation

Important guidelines:
- NO game-specific references or terminology
- NO background elements or environment
- Use universal fantasy elements
- Maintain character essence with generic terms

Example response format:
{
    "prompt": "A diminutive magical dragon with shimmering magenta scales, wearing ornate golden armor pieces. The creature's large, expressive golden eyes and playful expression convey a sense of mischief. Ethereal purple energy radiates from its form, creating a soft glow that highlights its polished, metallic accents."
}`,
                        },
                    ],
                    temperature: 0.25,
                    top_p: 1,
                    repetition_penalty: 1,
                },
                { headers: this.headers }
            );

            // Parse the JSON response from Claude
            const content = response.data.choices[0].message.content;
            try {
                const parsedContent = JSON.parse(content);
                return parsedContent.prompt;
            } catch (parseError) {
                console.error("Error parsing image prompt JSON:", parseError);
                throw new Error("Failed to parse image prompt response");
            }
        } catch (error) {
            console.error("Error generating image prompt:", error);
            throw new Error("Failed to generate image prompt");
        }
    }
}

export default new OpenRouterService();
