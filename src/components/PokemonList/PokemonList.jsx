import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(props) {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [pokedexURL, setPokedexURL] = useState("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"); 
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");


    async function DownloadPokemon() {

        const response = await  axios.get(pokedexURL)
        const PokemonResults = response.data.results;
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        setIsLoading(true);
       
        const pokemonResultPromises = PokemonResults.map((pokemon) => {
            return axios.get(pokemon.url)
        })
        const pokemonResultResponses = await Promise.all(pokemonResultPromises);
       const  res = pokemonResultResponses.map((response) => {
            const pokemon = response.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_default,
                types: pokemon.types
            }

        });
        console.log(res);
        setPokemonList(res);
        setIsLoading(false); 

    }

    useEffect(() => {

      DownloadPokemon();
    },[pokedexURL])
       

    return ( 
        <div className="m-8 m-auto"> 
        <div> Pokemon List</div>  

        <div className="flex flex-row flex-wrap justify-evenly">
             {(isLoading) ? "Loading..." : 
            pokemonList.map((pokemon) => <Pokemon key={pokemon.id} name={pokemon.name} image={pokemon.image} />
            )}
            
        </div>   

        <div className = " m-auto flex flex-row justify-center gap-4 mt-4">
                <button className="bg-blue-500  text-white font-bold py-2 px-4 rounded" disabled = {prevUrl === null} onClick={() => setPokedexURL(prevUrl)}>Prev</button>
                <button className="bg-blue-500  text-white font-bold py-2 px-4 rounded" disabled = {nextUrl === null} onClick={() => setPokedexURL(nextUrl)}>Next</button>

        </div>     

        </div>
    )
}
export default PokemonList;