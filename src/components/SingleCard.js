import './SingleCard.modules.css'
import React from 'react'

export default function SingleCard({card, handleClick,flipped,disabled}) {
  return (
    <div className={flipped ? 'flipped card' : 'card'}>
        <img className='back'  src="/img/cover.png" alt="Cover" onClick= {() => { !disabled && handleClick(card)}} />
        <img className='front' src={card.src} alt= "front-card" />
    </div>
  )
}
