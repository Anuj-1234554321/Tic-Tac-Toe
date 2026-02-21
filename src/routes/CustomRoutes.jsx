import {Routes, Route} from 'react-router-dom'
import Pokedex from '../components/pokedex/pokedex'
import PokemonDetail from '../components/PokemonDetails/PokemonDetail'
function CustomRoutes() {

    return (
        <Routes>
            <Route path = "/" element = {<Pokedex />} />
            <Route path = "/Pokemon/:id" element = {<PokemonDetail />} />
        </Routes>

    );
}

export default CustomRoutes;