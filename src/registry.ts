import { commandCatch } from "./commands/command_catch.js";
import { commandExit } from "./commands/command_exit.js";
import { commandExplore } from "./commands/command_explore.js";
import { commandHelp } from "./commands/command_help.js";
import { commandInspect } from "./commands/command_inspect.js";
import { commandMap, commandMapB } from "./commands/command_map.js";
import { commandPokedex } from "./commands/command_pokedex.js";
import { CLICommand } from "./state.js";



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
        },
        explore: {
            name: "explore",
            description: "Explores a location and shows the pokemon that can be found there. Usage: explore <location_name>",
            callback: commandExplore
        },
        catch: {
            name: "catch",
            description: "Catches a pokemon and adds it to your pokedex. Usage: catch <pokemon_name>",
            callback: commandCatch
        },
        inspect: {
            name: "inspect",
            description: "Inspects a pokemon in your pokedex and shows its details. Usage: inspect <pokemon_name>",
            callback: commandInspect
        },
        pokedex: {
            name: "pokedex",
            description: "Shows all the pokemon in your pokedex",
            callback: commandPokedex
        }
    }
}