import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Ingredient, SavedDrink } from '../types/coctails';
import { downloadJson } from '../util/generateDrinkJSON';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const AddDrinkDialog: React.FC<Props> = ({ isOpen, closeModal }) => {
  const [drinkName, setDrinkName] = useState<string>('');
  const [instruction, setInstruction] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [glass, setGlass] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredientName, setNewIngredientName] = useState<string>('');
  const [newIngredientAmount, setNewIngredientAmount] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const addIngredient = () => {
    if (newIngredientName) {
      setIngredients([...ingredients, { name: newIngredientName, amount: newIngredientAmount }]);
      setNewIngredientName('');
      setNewIngredientAmount('');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!drinkName || !instruction || !category || !glass) {
      setError('Please fill in all required fields.');
      return;
    }
    if (ingredients.length === 0) {
        setError('A drink must have ingredients.');
      return;
    }
    const newDrink: SavedDrink = {
      strDrink: drinkName,
      strInstructions: instruction,
      strCategory: category,
      strGlass: glass,
      ingredients: ingredients,
    };
    if (image) {
      newDrink.strDrinkThumb = image;
    }
    downloadJson(newDrink);
    setDrinkName('');
    setInstruction('');
    setCategory('');
    setGlass('');
    setIngredients([]);
    setNewIngredientName('');
    setNewIngredientAmount('');
    setImage('');
    setError('');
    closeModal();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-2xl bg-indigo-400 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-bold leading-6 text-gray-900"
                  >
                    Add a drink
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
                    <label className="flex flex-col gap-1">
                      <span>Drink Name:</span>
                      <input type="text" value={drinkName} onChange={(e) => setDrinkName(e.target.value)} className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span>Instruction:</span>
                      <textarea value={instruction} onChange={(e) => setInstruction(e.target.value)} className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span>Category:</span>
                      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span>Glass:</span>
                      <input type="text" value={glass} onChange={(e) => setGlass(e.target.value)} className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span>Image:</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </label>
                    <div className="flex flex-col gap-1">
                      <span>Ingredients:</span>
                      <ul>
                        {ingredients.map((ingredient, index) => (
                          <li key={index}>
                            {`${ingredient.name}${ingredient.amount && `: ${ingredient.amount}`}`}
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-2">
                        <label className="flex flex-col gap-1">
                          <span>Ingredient Name:</span>
                          <input type="text" value={newIngredientName} onChange={(e) => setNewIngredientName(e.target.value)} className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </label>
                        <label className="flex flex-col gap-1">
                          <span>Amount:</span>
                          <input type="text" value={newIngredientAmount} onChange={(e) => setNewIngredientAmount(e.target.value)} className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </label>
                        <button type="button" onClick={addIngredient} className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Add Ingredient</button>
                      </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddDrinkDialog;
