import { Location } from "../pokeapi.js";
import { State } from "../state.js";


export async function commandExplore(state: State, locationName: string): Promise<void> {
    if (!locationName) {
        console.log("Please provide a location name to explore.");
        return;
    }

    try {
        const placeInformation: Location = await state.pokeAPI.fetchLocation(locationName);
        console.log(`Exploring location: ${placeInformation.name}`);
        console.log("Found Pokemon:");
        placeInformation.pokemon_encounters.forEach(pokemon => console.log(`- ${pokemon}`));
    } catch (error) {
        console.log("Could not find the specified location. Please check the name and try again.");
        return;
    }


}
