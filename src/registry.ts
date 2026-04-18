import { commandExit } from "./commands/command_exit.js";
import { commandHelp } from "./commands/command_help.js";
import { commandMap, commandMapB } from "./commands/command_map.js";
import { CLICommand, State } from "./state.js";



export function getCommands(): Record<string, CLICommand>{
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        },
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit
        },
        map: {
            name: "map",
            description: "Displays the map of the current location",
            callback: commandMap
        },
        mapb: {
            name: "mapb",
            description: "Displays the map of the previous location",
            callback: commandMapB
        }
    }
}