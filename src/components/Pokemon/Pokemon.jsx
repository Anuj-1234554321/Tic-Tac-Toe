function Pokemon({name,image}){
    return (
        <div className="flex-basis-1/3  ">
            <img src={image} alt={name} className="pokemon-image"/>
            <h3 className="pokemon-name">{name}</h3>
        </div>
    )
}
export default Pokemon;