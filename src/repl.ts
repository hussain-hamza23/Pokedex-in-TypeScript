import { State, CLICommand } from "./state.js";

export function cleanInput(input: string): string[]{
    const splitText = input.split(/\s+/).filter((s) => s != "");
    return splitText.map((s) => s.trim().toLowerCase())
}

export async function startREPL(state: State) {

    state.line.prompt();

    state.line.on("line", async (input: string) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            state.line.prompt();
            return;
        }
        try {
            const command: CLICommand = state.commandRegistry[cleanedInput[0]];
            const args = cleanedInput.slice(1);
            if (!command) {
                console.log("Unknown command");
                return;
            }

            await command.callback(state, ...args);
        }
        catch (e) {
            console.log("An error occurred while executing the command - " + (e as Error).message);
        } finally {
            state.line.prompt();
        }
    })
}