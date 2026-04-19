import { ShallowLocations } from "../pokeapi.js";
import { State } from "../state.js";


export async function commandMap(state: State): Promise<void> {
    if (!state.urls.nextURL) {
        console.log("No more locations to display.");
        return;
    }
    
    const places: ShallowLocations = await state.pokeAPI.fetchLocations(state.urls.nextURL!);

    for (const location of places.locations) {
        console.log(location.name);
    }
    state.urls.nextURL = places.nextURL;
    state.urls.previousURL = places.previousURL;
}

export async function commandMapB(state: State): Promise<void> {
    if (!state.urls.previousURL) {
        console.log("No previous locations to display.");
        return;
    }
    const places: ShallowLocations = await state.pokeAPI.fetchLocations(state.urls.previousURL!);

    places.locations.forEach(location => console.log(location.name));
    
    state.urls.nextURL = places.nextURL;
    state.urls.previousURL = places.previousURL;
}
