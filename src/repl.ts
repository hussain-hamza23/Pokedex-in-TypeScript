import { createInterface } from "readline" 
import { getCommands } from "./registry.js";
import { State, CLICommand } from "./state.js";

export function cleanInput(input: string): string[]{
    const splitText = input.split(/\s+/).filter((s) => s != "");
    return splitText.map((s) => s.trim().toLowerCase())
}

export function startREPL(state: State) {

    state.line.prompt();

    state.line.on("line", async (callback: string) => {
        const cleanedInput = cleanInput(callback);
        if (cleanedInput.length === 0) {
            state.line.prompt();
            return;
        }
        try {
            const command: CLICommand = state.commandRegistry[cleanedInput[0]];
            if (!command) {
                console.log("Unknown command");
                state.line.prompt();
                return;
            }
            else {
                await command.callback(state);
            }
        }
        catch (e) {
            console.log("An error occurred while executing the command");
        }

        state.line.prompt();
    })
}