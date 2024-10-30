import db from "../db/config";
import puppeteer from "puppeteer";

class WarcraftPetsService {
    private async delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    private async scrapePetImageUrl(
        petId: number
    ): Promise<{ imageUrl: string | null; petUrl: string | null }> {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
            ],
        });

        try {
            const page = await browser.newPage();
            page.setDefaultTimeout(30000);

            // Navigate directly to the pet page using ID
            const petUrl = `https://www.warcraftpets.com/?id=${petId}`;
            console.log(`Navigating to: ${petUrl}`);

            await page.goto(petUrl, {
                waitUntil: "networkidle0",
                timeout: 30000,
            });

            // Wait for the image to load
            console.log("Looking for pet image...");
            const imageElement = await page.waitForSelector(
                "div.imageright > img",
                {
                    timeout: 30000,
                }
            );

            if (!imageElement) {
                throw new Error("Image element not found");
            }

            // Get the image URL
            const imageUrl = await page.evaluate((el) => el.src, imageElement);
            console.log(`Found image URL: ${imageUrl}`);

            // Get the final URL after any redirects
            const finalUrl = page.url();
            console.log(`Final URL: ${finalUrl}`);

            return {
                imageUrl,
                petUrl: finalUrl,
            };
        } catch (error) {
            console.error(`Error scraping image for pet ID ${petId}:`, error);
            return {
                imageUrl: null,
                petUrl: null,
            };
        } finally {
            await browser.close();
        }
    }

    async scrapePetById(petId: number) {
        try {
            // First check if we already have this pet's image
            const existing = await db("warcraftpets_images")
                .where({ pet_id: petId })
                .first();

            if (existing) {
                return { message: "Pet image already exists", data: existing };
            }

            // Get the pet data from blizzard_pets
            const pet = await db("blizzard_pets").where({ id: petId }).first();

            if (!pet) {
                throw new Error(`No pet found with id: ${petId}`);
            }

            console.log(`Starting scrape for pet ID ${petId}: ${pet.name}`);

            // Get the image URL using the direct ID URL
            const { imageUrl, petUrl } = await this.scrapePetImageUrl(petId);

            if (!imageUrl || !petUrl) {
                throw new Error(`Could not find image for pet: ${pet.name}`);
            }

            const record = {
                pet_id: petId,
                pet_url: petUrl,
                pet_image_url: imageUrl,
            };

            await db("warcraftpets_images").insert(record);

            return {
                message: "Pet image record created",
                data: record,
            };
        } catch (error) {
            console.error("Error in scrapePetById:", error);
            throw error;
        }
    }

    async scrapePets(limit: number = 10) {
        const startTime = Date.now();
        console.log("\n=== Starting Batch Pet Image Scrape ===");
        console.log(`Time: ${new Date().toISOString()}`);
        console.log(`Requested Limit: ${limit} pets`);

        try {
            // Find pets that don't have images yet
            const petsToScrape = await db("blizzard_pets")
                .whereNotExists(function () {
                    this.select("*")
                        .from("warcraftpets_images")
                        .whereRaw(
                            "warcraftpets_images.pet_id = blizzard_pets.id"
                        );
                })
                .limit(limit);

            console.log(`Found ${petsToScrape.length} pets to scrape`);

            const results = [];
            let successCount = 0;
            let errorCount = 0;

            for (const pet of petsToScrape) {
                try {
                    const result = await this.scrapePetById(pet.id);
                    results.push(result);
                    successCount++;
                    console.log(`Successfully scraped: ${pet.name} (ID: ${pet.id})`);
                } catch (err) {
                    const error = err as Error;
                    console.error(`Error scraping pet ${pet.id}:`, error);
                    results.push({
                        error: true,
                        pet_id: pet.id,
                        message: error.message,
                    });
                    errorCount++;
                }
            }

            const endTime = Date.now();
            const duration = ((endTime - startTime) / 1000).toFixed(2);

            console.log("\n=== Batch Pet Image Scrape Complete ===");
            console.log(`Time Elapsed: ${duration} seconds`);
            console.log(`Total Processed: ${petsToScrape.length}`);
            console.log(`Successful: ${successCount}`);
            console.log(`Failed: ${errorCount}`);
            console.log("=====================================\n");

            return {
                message: `Batch scrape completed for ${results.length} pets`,
                stats: {
                    total: petsToScrape.length,
                    successful: successCount,
                    failed: errorCount,
                    timeElapsed: `${duration} seconds`
                },
                results,
            };
        } catch (error) {
            const endTime = Date.now();
            const duration = ((endTime - startTime) / 1000).toFixed(2);
            
            console.error("Error in scrapePets:", error);
            console.log("\n=== Batch Pet Image Scrape Failed ===");
            console.log(`Time Elapsed: ${duration} seconds`);
            console.log("=====================================\n");
            
            throw error;
        }
    }
}

export default new WarcraftPetsService();
