import { useState, useEffect } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  const shuffleCards  = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(()=>Math.random() - 0.5)
    .map(card => ({...card, id:Math.random()}))

    setCards(shuffledCards)
    setTurns(0)
  }

  const resetTurns=() =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurns((prevTurns) => prevTurns + 1)
  }

  useEffect(()=> {
    shuffleCards();
  },[])
  useEffect(()=> {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        console.log("cards mathced")
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src ===  choiceOne.src){
              return {...card,matched: true}
            } else {
              return card 
            }
          })
        })
        console.log(cards)
        resetTurns()
      }
      else {
        console.log("dont match")

        setTimeout(()=> resetTurns(),1000)

       
      }
    }

  },[choiceOne,choiceTwo])

  const handleCardChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
          {cards.map((card) => (
            <SingleCard 
            key= {card.id} 
            card={card} 
            handleClick={handleCardChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.matched} 
            disabled = {disabled}
            
            />
          ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App