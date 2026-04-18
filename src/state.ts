import { createInterface, type Interface} from "readline";
import { getCommands } from "./registry.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
    line: Interface
    commandRegistry: Record<string, CLICommand>
    pokeAPI: PokeAPI,
    urls: {
        nextURL: string | null;
        previousURL: string | null;
    }

}


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export function initState(): State {
    //stores all commands in a list
    const listOfCommands: Record<string, CLICommand> = getCommands();
    const entryURL: string = "https://pokeapi.co/api/v2/location-area/";
    const readLine: Interface = createInterface(
        {
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > "
        }
    )

    return {
        line: readLine,
        commandRegistry: listOfCommands,
        pokeAPI: new PokeAPI(),
        urls: {
            nextURL: entryURL,
            previousURL: null
        }

    };
}