import { INGREDIENT_KEY, MESUREMENT_KEY } from "../data/consts";

export const generateDrinkStr = (drink) => {
    let str = ``;
    for(let i = 1; i <= 15; i++) {
      if (drink[INGREDIENT_KEY + i.toString()] !== null) {
        str += `${i}. ${drink[INGREDIENT_KEY + i.toString()]}`;
        if (drink[MESUREMENT_KEY + i.toString()] !== null) {
            str += `: ${drink[MESUREMENT_KEY + i.toString()]}`
        }
        str += `\n`
      } else break;
    }
    return str;
  }