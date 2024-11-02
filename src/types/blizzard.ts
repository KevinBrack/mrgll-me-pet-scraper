export interface PetsListResponse {
    _links: {
        self: {
            href: string;
        };
    };
    pets: PetsListDetails[];
}

export interface PetsListDetails {
    key: {
        href: string;
    };
    name: string;
    id: number;
}

export interface PetDetailsResponse {
    _links: {
        self: {
            href: string;
        };
    };
    id: number;
    name: string;
    battle_pet_type: {
        id: number;
        type: string;
        name: string;
    };
    description: string;
    is_capturable: boolean;
    is_tradable: boolean;
    is_battlepet: boolean;
    is_alliance_only: boolean;
    is_horde_only: boolean;
    abilities: Array<PetAbilitiesResponse>;
    source: {
        type: string;
        name: string;
    };
    icon: string;
    creature: {
        key: {
            href: string;
        };
        name: string;
        id: number;
    };
    is_random_creature_display: boolean;
    media: {
        key: {
            href: string;
        };
        id: number;
    };
    should_exclude_if_uncollected: boolean;
}

export interface PetMediaDetails {
    _links: {
        self: {
            href: string;
        };
    };
    assets: Array<{
        key: string;
        value: string;
        file_data_id: number;
    }>;
    id: number;
}

export interface PetAbilitiesResponse {
    ability: {
        key: {
            href: string;
        };
        name: string;
        id: number;
    };
    slot: number;
    required_level: number;
}

export interface PetAbilitiesIndexResponse {
    _links: {
        self: {
            href: string;
        };
    };
    abilities: Array<{
        key: {
            href: string;
        };
        name: string;
        id: number;
    }>;
}

export interface PetAbilityDetailsResponse {
    _links: {
        self: {
            href: string;
        };
    };
    id: number;
    name: string;
    battle_pet_type: {
        id: number;
        type: string;
        name: string;
    };
    rounds: number;
    media: {
        key: {
            href: string;
        };
        id: number;
    };
}

export interface PetAbilityMediaResponse {
    _links: {
        self: {
            href: string;
        };
    };
    assets: Array<{
        key: string;
        value: string;
        file_data_id: number;
    }>;
    id: number;
}
