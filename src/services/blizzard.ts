import axios from "axios";
import {
    PetsListResponse,
    PetDetailsResponse,
    PetMediaDetails,
} from "../types/blizzard";

interface TokenResponse {
    access_token: string;
    expires_in: number;
}

class BlizzardService {
    private accessToken: string | null = null;
    private tokenExpiration: number = 0;

    private async getAccessToken(): Promise<string> {
        // Return existing token if it's still valid
        if (this.accessToken && Date.now() < this.tokenExpiration) {
            return this.accessToken;
        }

        try {
            console.log("Attempting to get Blizzard access token...");
            const response = await axios.post<TokenResponse>(
                "https://us.battle.net/oauth/token",
                new URLSearchParams({
                    grant_type: "client_credentials",
                }),
                {
                    auth: {
                        username: process.env.BLIZZARD_CLIENT_ID!,
                        password: process.env.BLIZZARD_CLIENT_SECRET!,
                    },
                }
            );

            this.accessToken = response.data.access_token;
            this.tokenExpiration = Date.now() + response.data.expires_in * 1000;
            console.log("Successfully obtained access token");
            return this.accessToken;
        } catch (error: any) {
            console.error("Error getting Blizzard access token:", {
                message: error.message,
                response: error.response?.data,
            });
            throw new Error("Failed to get access token");
        }
    }

    private async makeRequest<T>(
        url: string,
        params: Record<string, string> = {}
    ): Promise<T> {
        try {
            console.log(`Making request to: ${url}`);
            const token = await this.getAccessToken();
            const response = await axios.get<T>(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    ...params,
                },
            });
            console.log(`Successfully received response from: ${url}`);
            return response.data;
        } catch (error: any) {
            console.error(`Error making request to ${url}:`, {
                message: error.message,
                response: error.response?.data,
            });
            throw error;
        }
    }

    async getPetsList(): Promise<PetsListResponse> {
        console.log("Fetching pets list...");
        return this.makeRequest<PetsListResponse>(
            "https://us.api.blizzard.com/data/wow/pet/index",
            {
                namespace: "static-us",
                locale: "en_US",
            }
        );
    }

    async getPetDetails(petId: number): Promise<PetDetailsResponse> {
        console.log(`Fetching details for pet ID: ${petId}`);
        return this.makeRequest<PetDetailsResponse>(
            `https://us.api.blizzard.com/data/wow/pet/${petId}`,
            {
                namespace: "static-us",
                locale: "en_US",
            }
        );
    }

    async getPetMedia(petId: number): Promise<PetMediaDetails> {
        console.log(`Fetching media for pet ID: ${petId}`);
        return this.makeRequest<PetMediaDetails>(
            `https://us.api.blizzard.com/data/wow/media/pet/${petId}`,
            {
                namespace: "static-us",
                locale: "en_US",
            }
        );
    }
}

export default new BlizzardService();
