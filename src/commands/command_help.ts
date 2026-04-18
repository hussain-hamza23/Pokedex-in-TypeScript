import { getCommands } from "../registry.js";
import { CLICommand, State } from "../state.js";


export function commandHelp(state: State) {
    console.log("Welcome to the Pokedex!")
    console.log("Usage:")
    for (const command in state.commandRegistry) {
        console.log(`${state.commandRegistry[command].name}: ${state.commandRegistry[command].description}`);
    }
}