import {useState, useEffect} from 'react'
import axios from 'axios'

function usePokemonList() {
    const[pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexURL: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
        nextUrl: "",
        prevUrl: ""
    });


async function DownloadPokemon() {

       try
       {
         const response = await  axios.get(pokemonListState.pokedexURL)
        const PokemonResults = response.data.results;
        setPokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous,
             isLoading: true
        }));
       
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
        setPokemonListState((state) => ({
            ...state,
            pokemonList: res,
            isLoading: false
        }));


       }
       catch(error) {
        console.error("Error fetching Pokémon:", error);
            setPokemonListState((state) => ({
                ...state,
                isLoading: false

       }));
       }

    }

    useEffect(() => {

      DownloadPokemon();
    },[pokemonListState.pokedexURL])

    return {pokemonListState, setPokemonListState}

}
export default usePokemonList;