import React, { Fragment, useState } from "react";
import { PREVIEW } from "../data/consts";
import { Drink } from "../types/coctails";
import Recipe from "./Recipe";

interface Props {
    drink: Drink;
}

const DrinkDisplay: React.FC<Props> = ({ drink }) => {
    const [showDrinkHover, setShowDrinkHover] = useState<boolean>(false);
    const [showRecipe, setShowRecipe] = useState<boolean>(false);

    return (
        <>
            <div 
                onClick={() => setShowRecipe(true)}
                onMouseEnter={() => setShowDrinkHover(true)}
                onMouseLeave={() => setShowDrinkHover(false)}
                className="relative w-40 h-40 aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden"
            >
                <div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{ backgroundImage: `url(${drink.strDrinkThumb + PREVIEW})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                {showDrinkHover && (
                    <div className="cursor-pointer absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 rounded-2xl">
                        <p className="text-black text-lg font-semibold text-center">{drink.strDrink}</p>
                    </div>
                )}
            </div>
            <Recipe drink={drink} isOpen={showRecipe} closeModal={() => setShowRecipe(false)}/>
        </>
    );
}

export default DrinkDisplay;
