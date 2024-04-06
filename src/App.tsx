import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { Drink } from './types/coctails';
import { getRandomDrinks, searchForPrompt } from './api/requests';
import DrinksGrid from './components/DrinksGrid';

function App() {

  const [currentDrinks, setCurrentDrinks] = useState<Drink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getDrinks = async () =>{
    setIsLoading(true);
    const drinks = await getRandomDrinks();
    if (drinks) {
      setCurrentDrinks(drinks)
    };
    setIsLoading(false);
  };

  useEffect(() => {
    getDrinks();
  }, []);

  console.log(currentDrinks)

  const searchForDrinks = async (prompt: string) => {
    setIsLoading(true);
    const drinks = await searchForPrompt(prompt);
    if (drinks) setCurrentDrinks(drinks);
    setIsLoading(false);
  }

  return (
    <div className='min-h-screen bg-indigo-900'>
      <Navbar />
      <div className='w-full p-4 flex items-center justify-center'>
        <DrinksGrid isSearching={isLoading} onGenerate={getDrinks} onSearch={searchForDrinks} drinks={currentDrinks} />
      </div>  
    </div>
  );
}

export default App;
