import Search from "../search/search";
import PokemonList from "../PokemonList/PokemonList";
function Pokedex(){

    return (
        <div className="flex flex-col w-[1000px] m-auto">
            <h1 className="text-3xl font-bold m-6 p-2">Pokedex</h1>
            <Search />
            <PokemonList />
        
        </div>
    )

} 
export default Pokedex;