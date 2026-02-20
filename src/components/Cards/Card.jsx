import Icon from "../Icons/Icon";
function Card({gameEnd, player, onPlay, index}){
    let icon = <Icon/>
    if(player == "X"){
        icon = <Icon name="cross"/>
    }else if(player == "O"){
        icon = <Icon name="circle"/>
    }

    return (
        <div className="border-1 border-black p-8 m-2 flex items-center justify-center w-[150px] h-[150px] bg-yellow-300 rounded-[10%]" onClick={() => !gameEnd && player == "" && onPlay(index)}>
            {icon}
        </div>
    )

}
export default Card;