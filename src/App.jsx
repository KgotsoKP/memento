import React, { useState, useEffect } from "react";
import "./App.css";

import shuffle from "./utilities/shuffle";

import Card from "./compoenents/Card";
import Header from "./compoenents/Header";

import useAppBadge from "./hooks/useAppBadge";

function App() {
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [wins, setWins] = useState(0);
  const [setBadge, clearBadge] = useAppBadge();

  //Handle card selection
  const handleClick = (card) => {
    console.log("card");
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  // Start Over
  const handleNewGame = () => {
    clearBadge();
    setWins(0);
    handleTurn();
    setCards(shuffle);
  };

  // Used for selection and match handling
  useEffect(() => {
    let pickTimer;

    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              return { ...card, matched: true };
            } else {
              //no match
              return card;
            }
          })
        });
        handleTurn();
      } else {

        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }


    return () => {
      clearTimeout(pickTimer);
    };

  }, [cards, pickOne, pickTwo]);


  //if Player has found all matches , handle accordingly
  useEffect(() => {
    // Check for any remain matches
    const checkWin = cards.filter((card) => !card.matched);

    // All matches made, handel win/badge counters
    if (cards.length && checkWin.length < 1) {
      console.log('You Won');
      setWins(wins + 1);
      handleTurn();
      setBadge();
      setCards(shuffle);
    }
  }, [cards, wins]);

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />

      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClick(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
