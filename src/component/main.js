import Die from './die'
import React from 'react'
import Confetti from 'react-confetti'

const main = function Main() {

    const [dice, setDice] = React.useState(randomDice)
    const [tenzies, setTenzies] = React.useState(false)
    const [btnText, setBtnText] = React.useState("Roll")

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const isTheSame = dice.every(die => die.value === firstValue)
        if (allHeld && isTheSame) {
            setTenzies(true)
            console.log("you won!")
        }

    }, [dice])

    function randId() {
        let id = ""
        const str = "ABCDEFGHIGKLMNOPQRSTUVWXYZ1234567890"
        for (let i = 0; i < 7; i++) {
            let rand = Math.floor(Math.random() * str.length)
            id += str[rand]
        }
        return id
    }

    function randomDice() {
        let newArray = []
        for (let i = 0; i < 10; i++) {
            newArray.push(
                {
                    id: randId(),
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false
                })
        }
        return newArray
    }

    function dieFlip(id) {
        setDice(oldDie => oldDie.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }


    function reRollDice() {
        if (!tenzies) {
            setDice(oldDie => oldDie.map(die => {
                return die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
            }))
        } else {
            setTenzies(false)
            setDice(randomDice())
        }
    }

    const allDice = dice.map(die => {
        return <Die
            key={die.id}
            die={die}
            id={die.id}
            selected={dieFlip}
        />
    })

    return (
        <div className="main">
            {tenzies && <Confetti />}
            <div className="main--container">
                <h1 className="text-title">Tenzies</h1>
                <p className="text-instruction">Roll until the dice are the same. Click each die to freeze it all
                    its current value between rolls.</p>
                <div className="die-container">
                    {allDice}
                </div>
                <button onClick={reRollDice} className='btn_roll'>{tenzies ? "New Game" : "Roll"}</button>
            </div>
        </div>
    )
}

export default main