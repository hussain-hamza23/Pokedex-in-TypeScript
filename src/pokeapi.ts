

export class PokeAPI {
    private static readonly apiURL = "https://pokeapi.co/api/v2";

    constructor() {}
    
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const response = await fetch(pageURL ? pageURL : `${PokeAPI.apiURL}/location-area/`);
        const data = await response.json();
        return {
            nextURL: data.next,
            previousURL: data.previous,
            locations: data.results
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const response = await fetch(`${PokeAPI.apiURL}/location-area/${locationName}`);
        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            region: data.region
        }

    }
}

export type ShallowLocations = {
    nextURL: string | null;
    previousURL: string | null;
    locations: {
        name: string;
        url: string;
    }[]
};

export type Location = {
    id: number;
    name: string;
    region: {
        name: string;
        url: string;
    };
}