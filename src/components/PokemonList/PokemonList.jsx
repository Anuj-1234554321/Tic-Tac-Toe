
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";
function PokemonList() {

    const { pokemonListState, setPokemonListState } = usePokemonList();
       

    return ( 
        <div className="m-8 m-auto"> 
        <div> Pokemon List</div>  

        <div className="flex flex-row flex-wrap justify-evenly">
             {(pokemonListState.isLoading) ? "Loading..." : 
            pokemonListState.pokemonList.map((pokemon) => <Pokemon key={pokemon.id} name={pokemon.name} image={pokemon.image} id={pokemon.id} />
            )}
            
        </div>   

        <div className = " m-auto flex flex-row justify-center gap-4 mt-4">
                <button className="bg-blue-500  text-white font-bold py-2 px-4 rounded" disabled = {pokemonListState.prevUrl === null} onClick={() => setPokemonListState(prev => ({...prev, pokedexURL: prev.prevUrl}))}>Prev</button>
                <button className="bg-blue-500  text-white font-bold py-2 px-4 rounded" disabled = {pokemonListState.nextUrl === null} onClick={() => setPokemonListState(prev => ({...prev, pokedexURL: prev.nextUrl}))}>Next</button>

        </div>     

        </div>
    )
}
export default PokemonList;