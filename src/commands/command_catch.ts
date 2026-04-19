import { State } from "../state.js";
import { Pokemon } from "../pokeapi.js";


export async function commandCatch(state: State, pokemonName: string): Promise<void>{
    if (!pokemonName) {
        console.log("Please provide a Pokemon name to catch.");
        return;
    }
    console.log(`Throwing a Pokeball at ${pokemonName}...`)

    const pokemon: Pokemon = await state.pokeAPI.getPokemon(pokemonName);
    if (!pokemon) {
        console.log("Could not find the specified Pokemon. Please check the name and try again.");
        return;
    }

    //Random chance between 0 and 1
    const chance = (): number => {
        //base experience can go up to 300
        const experience = pokemon.base_experience;
        let exp: number = Math.floor(Math.random() * 300) / 300 * (experience / 100);
        if (exp > 1) exp = 1;
        return 1 - exp
    }

    const c = chance()

    if (c > 0.5) {
        console.log(`${pokemonName} was caught!`)
        state.Pokedex[pokemonName] = pokemon;
        console.log(c)
    } else {
        console.log(`${pokemonName} escaped!`)
        console.log(c)
    }
}