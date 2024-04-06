import { useState } from "react";
import SearchTextbox from "./SearchTextbox";
import AddDrinkDialog from "./AddDrinkDialog";
import { SavedDrink } from "../types/coctails";


interface Props {
    onSearch: (prompt: string) => void
    onGenerate: () => void

}

const Info: React.FC<Props> = ({onSearch, onGenerate}) => {
    const [addDrinkDialogOpen, setAddDrinkDialogOpen] = useState<boolean>(false);

    return ( 
        <>
            <div className="flex flex-col gap-4">
                <span className="text-2xl font-bold">Welcome To The Coctail Bar!</span>
                <span className="whitespace-break-spaces">{`You can check out different cocktails by clicking on them.\nDidn't see anything to your liking? Try searching for cocktails down here:`}</span>
                <SearchTextbox onSearch={onSearch}/>
                <span>Feeling lucky? Look up some random cocktails!</span>
                <button onClick={onGenerate} className="w-full bg-white rounded-2xl h-8 hover:bg-sky-100 hover:outline-sky-400">Look for random cocktails</button>
                <span>Have your own favorites? Add a new cocktail!</span>
                <button onClick={() => setAddDrinkDialogOpen(true)} className="w-full bg-white rounded-2xl h-8 hover:bg-sky-100 hover:outline-sky-400">Add a drink</button>
            </div>
            <AddDrinkDialog isOpen={addDrinkDialogOpen} closeModal={() => setAddDrinkDialogOpen(false)} />
        </>
     );
}
 
export default Info;