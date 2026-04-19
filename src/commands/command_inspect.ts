import { State } from "../state.js";


export async function commandInspect(state: State, pokemonName: string): Promise<void> {
    if (!pokemonName) {
        console.log("Please provide a Pokemon name to inspect.");
        return;
    }

    const pokemon = state.Pokedex[pokemonName];
    if (!pokemon) {
        console.log("You haven't caught that Pokemon yet. Please catch it first to inspect it.");
        return;
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Base Experience: ${pokemon.base_experience}`);
    console.log("Stats:");
    console.log(`- HP: ${pokemon.stats.hp}`);
    console.log(`- Attack: ${pokemon.stats.attack}`);
    console.log(`- Defense: ${pokemon.stats.defense}`);
    console.log(`- Special Attack: ${pokemon.stats.special_attack}`);
    console.log(`- Special Defense: ${pokemon.stats.special_defense}`);
    console.log(`- Speed: ${pokemon.stats.speed}`);
    console.log("Types:");
    pokemon.types.forEach(type => {
        console.log(`- ${type}`);
    });
}