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
            return this.accessToken;
        } catch (error) {
            console.error("Error getting Blizzard access token:", error);
            throw new Error("Failed to get access token");
        }
    }

    private async makeRequest<T>(
        url: string,
        params: Record<string, string> = {}
    ): Promise<T> {
        const token = await this.getAccessToken();
        const response = await axios.get<T>(url, {
            params: {
                ...params,
                access_token: token,
            },
        });
        return response.data;
    }

    async getPetsList(): Promise<PetsListResponse> {
        return this.makeRequest<PetsListResponse>(
            "https://us.api.blizzard.com/data/wow/pet/index",
            {
                namespace: "static-us",
                locale: "en_US",
            }
        );
    }

    async getPetDetails(petId: number): Promise<PetDetailsResponse> {
        return this.makeRequest<PetDetailsResponse>(
            `https://us.api.blizzard.com/data/wow/pet/${petId}`,
            {
                namespace: "static-us",
                locale: "en_US",
            }
        );
    }

    async getPetMedia(petId: number): Promise<PetMediaDetails> {
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
