import { getCommands } from "../registry.js";
import { CLICommand, State } from "../state.js";


export async function commandHelp(state: State): Promise<void> {
    console.log("Welcome to the Pokedex!")
    console.log("Usage:")
    for (const command in state.commandRegistry) {
        console.log(`${state.commandRegistry[command].name}: ${state.commandRegistry[command].description}`);
    }
}