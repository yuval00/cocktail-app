import React, { useState } from 'react';
import { Drink } from '../types/coctails';
import DrinkDisplay from './DrinkDisplay';
import Info from './Info';

interface Props {
  drinks: Drink[];
  isSearching: boolean;
  onSearch: (prompt: string) => void;
  onGenerate: () => void;
}

const DrinksGrid: React.FC<Props> = ({ drinks, onSearch, onGenerate, isSearching }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const drinksPerPage = 12;

  const indexOfLastDrink = currentPage * drinksPerPage;
  const indexOfFirstDrink = indexOfLastDrink - drinksPerPage;
  const currentDrinks = drinks.slice(indexOfFirstDrink, indexOfLastDrink);
  const numMissingCocktails = drinks.length % drinksPerPage;
  const pageAmount = Math.ceil(drinks.length / drinksPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-3/4 bg-indigo-500 rounded-2xl p-4 flex gap-4 justify-between h-[800px]">
      <Info onSearch={onSearch} onGenerate={() => {
        onGenerate()
        setCurrentPage(1);
      }} />
      {drinks.length > 0 ? !isSearching ? (
        <div className='h-full flex flex-col gap-2'>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 h-[90%]">
            {currentDrinks.map((drink) => (
              <DrinkDisplay drink={drink} key={drink.idDrink} />
            ))}
            {numMissingCocktails > 0 && currentPage === pageAmount &&
              Array.from({ length: drinksPerPage - numMissingCocktails }, (_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="w-40 h-40 aspect-w-1 aspect-h-1 rounded-2xl bg-indigo-900"
                />
              ))}
          </div>
          {drinks.length > 12 && 
          <div className="flex justify-center mt-4 h-[10%] flex-row">
            <button
              className="bg-indigo-600 text-white px-4 h-8 rounded-full mr-2"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="bg-indigo-600 text-white px-4 h-8 rounded-full"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastDrink >= drinks.length}
            >
              Next
            </button>
          </div>}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 ">
          <img className="w-10 aspect-square" src="loader.gif" alt="Loading indicator" />
          <span className="text-xl font-bold italic">Loading cocktails...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span className="text-xl font-bold italic">{"No cocktails found. Please try again :("}</span>
        </div>
      )}
    </div>
  );
};

export default DrinksGrid;
