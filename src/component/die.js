const die = function Die(props) {
    return (
        <div className={props.die.isHeld ? `die--selected` : 'die'} onClick={() => props.selected(props.id)}>
            <p className={props.die.isHeld ? `die--value_selected` : 'die--value'}>{props.die.value}</p>
        </div>
    )
}

export default die