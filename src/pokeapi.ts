import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly apiURL = "https://pokeapi.co/api/v2";
    private locationCache: Cache;

    constructor(cacheInterval: number) {
        this.locationCache = new Cache(cacheInterval);
    }
    
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const cachedLocations = pageURL ? this.locationCache.get<ShallowLocations>(pageURL) : undefined;
        if (cachedLocations !== undefined) {
            return cachedLocations;
        }
        try {
            const response = await fetch(pageURL ? pageURL : `${PokeAPI.apiURL}/location-area/`);
            const data = await response.json();
            const locations: ShallowLocations = {
                nextURL: data.next,
                previousURL: data.previous,
                locations: data.results
            };
            this.locationCache.add(response.url, locations);
            return locations;
        } catch (error) {
            throw new Error("Failed to fetch locations. Please try again later.");
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const cachedLocation = this.locationCache.get<Location>(locationName);
        if (cachedLocation !== undefined) {
            return cachedLocation;
        }
        try {
            const response = await fetch(`${PokeAPI.apiURL}/location-area/${locationName}`);
            const data = await response.json();
            const location: Location = {
                id: data.id,
                name: data.name,
                pokemon_encounters: data.pokemon_encounters.map((encounter: any) => encounter.pokemon.name)
            };
            this.locationCache.add(locationName, location);
            return location;
            
        } catch (error) {
            throw new Error("Failed to fetch location data. Please check the name and try again.");
        }

    }

    async getPokemon(pokemonName: string): Promise<Pokemon>{
        const cachedPokemon = this.locationCache.get<Pokemon>(pokemonName);
        if (cachedPokemon !== undefined) {
            return cachedPokemon;
        }

        try {
            const response = await fetch(`${PokeAPI.apiURL}/pokemon/${pokemonName}`);
            const data = await response.json();
            const pokemon: Pokemon = {
                name: data.name,
                base_experience: data.base_experience,
                stats: {
                    hp: data.stats.find((stat: any) => stat.stat.name === "hp").base_stat,
                    attack: data.stats.find((stat: any) => stat.stat.name === "attack").base_stat,
                    defense: data.stats.find((stat: any) => stat.stat.name === "defense").base_stat,
                    special_attack: data.stats.find((stat: any) => stat.stat.name === "special-attack").base_stat,
                    special_defense: data.stats.find((stat: any) => stat.stat.name === "special-defense").base_stat,
                    speed: data.stats.find((stat: any) => stat.stat.name === "speed").base_stat
                },
                types: data.types.map((typeInfo: any) => typeInfo.type.name)
            };
            this.locationCache.add(pokemonName, pokemon);
            return pokemon;
            
        } catch (error) {
            throw new Error("Failed to fetch Pokemon data. Please check the name and try again.");
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
    pokemon_encounters: string[];
};

export type Pokemon = {
    name: string;
    base_experience: number;
    stats: Stats;
    types: Type[];
};

type Stats = {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
}

type Type = {
    name: string | string[];
}






