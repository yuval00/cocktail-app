import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { Drink, Lang } from '../types/coctails';
import { PREVIEW } from '../data/consts';
import { generateDrinkStr } from '../util/ingredientString';
import LanguageButtons from './LanguageButtons';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  drink: Drink; 
}

const Recipe: React.FC<Props> = ({isOpen, closeModal, drink}) => {
  const [instructionLanguage, setInstructionLanguage] = useState<Lang>('en');
  const getCurrentInstructions = () => {
    if (instructionLanguage === 'en') return drink.strInstructions
    else if (instructionLanguage === 'es') return drink.strInstructionsES
    else if (instructionLanguage === 'de') return drink.strInstructionsDE
    else if (instructionLanguage === 'fr') return drink.strInstructionsFR
    else return drink.strInstructionsIT
  }

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
                    {drink.strDrink}
                  </Dialog.Title>
                  <div className="mt-2 w-full flex justify-between">
                    <div className='flex flex-col gap-2 w-1/2'>
                      <p className='text-lg text-gray-900 font-medium'>
                        Ingredients:
                      </p>
                      <p className='text-md text-gray-900 whitespace-pre-wrap'>
                        {generateDrinkStr(drink)}
                      </p>
                      <p className='text-lg text-gray-900 font-medium'>
                        Instrudctions:
                      </p>
                      <p className='text-md text-gray-900 whitespace-pre-wrap'>
                        {getCurrentInstructions()}
                      </p>
                      <LanguageButtons currentLang={instructionLanguage} setLanguage={setInstructionLanguage} drink={drink} />
                      <p className="text-xs text-gray-700 font-bold">Tags:</p>
                      <p className="text-xs text-gray-700 whitespace-pre-wrap">
                        {`Alcoholic? ${drink.strAlcoholic}\nType: ${drink.strCategory}\nGlass: ${drink.strGlass}`}
                      </p>
                    </div>
                    <img alt={drink.strDrink} src={drink.strDrinkThumb + PREVIEW} className='rounded-2xl w-60 h-60'/>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Recipe;