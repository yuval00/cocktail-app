import { Drink, Lang } from "../types/coctails";

interface Props {
    drink: Drink;
    setLanguage: (lang: Lang) => void;
    currentLang: Lang;
}

const LanguageButtons: React.FC<Props> = ({drink, setLanguage, currentLang}) => {
    return ( 
        <div className="flex gap-2">
            <button
                className={currentLang === 'en' ? 'bg-blue-500 text-white px-4 py-2 rounded-md' : 'bg-gray-300 text-gray-700 px-4 py-2 rounded-md'}
                onClick={() => setLanguage('en')}
                >
                🇺🇸
            </button>
            {drink.strInstructionsDE && (
                <button
                className={currentLang === 'de' ? 'bg-blue-500 text-white px-4 py-2 rounded-md' : 'bg-gray-300 text-gray-700 px-4 py-2 rounded-md'}
                onClick={() => setLanguage('de')}
                >
                🇩🇪
                </button>
            )}
            {drink.strInstructionsES && (
                <button
                className={currentLang === 'es' ? 'bg-blue-500 text-white px-4 py-2 rounded-md' : 'bg-gray-300 text-gray-700 px-4 py-2 rounded-md'}
                onClick={() => setLanguage('es')}
                >
                🇪🇸
                </button>
            )}
            {drink.strInstructionsFR && (
                <button
                className={currentLang === 'fr' ? 'bg-blue-500 text-white px-4 py-2 rounded-md' : 'bg-gray-300 text-gray-700 px-4 py-2 rounded-md'}
                onClick={() => setLanguage('fr')}
                >
                🇫🇷
                </button>
            )}
            {drink.strInstructionsIT && (
                <button
                className={currentLang === 'it' ? 'bg-blue-500 text-white px-4 py-2 rounded-md' : 'bg-gray-300 text-gray-700 px-4 py-2 rounded-md'}
                onClick={() => setLanguage('it')}
                >
                🇮🇹
                </button>
            )}
        </div>
     );
}
 
export default LanguageButtons;