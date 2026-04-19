import { State } from "../state.js";


export async function commandPokedex(state: State): Promise<void> {
    console.log("Your Pokedex:");
    if (Object.keys(state.Pokedex).length === 0) {
        console.log("You haven't caught any Pokemon yet. Use the 'catch' command to catch some!");
        return;
    }
    Object.values(state.Pokedex).forEach(pokemon => {
        console.log(`- ${pokemon.name}`);
    });
}