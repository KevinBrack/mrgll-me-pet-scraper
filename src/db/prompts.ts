import db from "./config";

interface ArtStyle {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

export async function getArtStyle(name: string): Promise<ArtStyle | null> {
    try {
        const style = await db("prompts_art_styles").where({ name }).first();
        return style || null;
    } catch (error) {
        console.error("Error fetching art style:", error);
        throw new Error("Failed to fetch art style");
    }
}
