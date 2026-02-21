import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";  
 function PokemonDetail() {
    const {id} = useParams();
    const[pokemon,setPokemon] = useState("");
   async function DownloadPokemonDetails(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
            id: response.data.id,
            name: response.data.name,
            image: (response.data.sprites.other) ? response.data.sprites.other.dream_world.front_default : response.data.sprites.front_default,
            types: response.data.types.map(typeInfo => typeInfo.type.name),
            weight: response.data.weight,
            height: response.data.height
        })
   }

    useEffect(() => {
            DownloadPokemonDetails();
        },[])


    return (
        <div className="pokemon-detail">
           <div className="pokemon-name">{pokemon.name}</div>
            <img src={pokemon.image} alt={pokemon.name} />
            <div className="pokemon-types">Types: {pokemon.types && pokemon.types.join(", ")}</div>
           <div className="pokemon-weight">Weight: {pokemon.weight}</div>
           <div className="pokemon-height">Height: {pokemon.height}</div>
        </div>
    )
}
export default PokemonDetail;