import React from 'react'

const Card = ({ image, selected, onClick }) => {
  return (
    <div className='card'>
      <div className={selected && 'selected'} >
        <img alt='' src={image} className='card-face' />
        <img
          alt=''
          src={'/assets/popcorn.png'}
          className='card-back'
          onClick={onClick}
        />
      </div>
    </div>
  )
}

export default Card;
