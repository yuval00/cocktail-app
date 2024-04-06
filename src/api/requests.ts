import axios from "axios";
import { BASE_URL, RANDOM, SEARCH_BY_NAME } from "../data/consts";
import { Drink } from "../types/coctails";

export const searchForPrompt = async (prompt: string): Promise<Drink[] | null> => {
    const result = await axios.get(BASE_URL + SEARCH_BY_NAME + prompt).then(res =>
        res.data.drinks as Drink[]
    ).catch((e) => {
        console.log(e);
        return null;
    })
    return result;
}

export const getRandomDrinks = async (): Promise<Drink[] | null> => {
    const drinks: Drink[] = [];
    for (let i = 0; i < 12; i++) {
        const result = await axios.get(BASE_URL + RANDOM).then(res =>
            res.data.drinks[0] as Drink
        ).catch((e) => {
            console.log(e);
            return null;
        })
        if (result !== null) drinks.push(result);
    }
    if (drinks.length > 0) return drinks;
    else return null;
}
 