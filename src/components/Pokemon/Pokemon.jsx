import {Link} from 'react-router-dom'
function Pokemon({name,image,id}){
    return (
        <div className="flex-basis-1/3  ">
          <Link to={`/Pokemon/${id}`}>
            <div><img src={image} alt={name} className="pokemon-image"/></div>
            <div className="pokemon-name">{name}</div>
          </Link>
        </div>
    )
}
export default Pokemon;