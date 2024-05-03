import React, { useState } from 'react';
import './App.css';
import shuffle from './utilities/shuffle';
import Card from './compoenents/Card';

function App() {
  const [cards, setCards] = useState(shuffle);


  return (
    <>
      <div className='grid'>
        {cards.map((card) => {

          const { image, id, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              selcted={false}
              onClick={() => { }}
            />
          )
        })}
      </div>

    </>
  );
}

export default App;
