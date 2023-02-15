import React from "react";
import { useEffect, useState } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState([]);
  const [tenzies, setTenzies] = useState(false);

  const generateNewDice = () => {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
      setDice([...newDice]);
    }
  };
  useEffect(() => {
    generateNewDice();
  }, []);
  useEffect(() => {
    if (dice.length > 0) {
      const allHeld = dice.every((die) => die.isHeld);
      const firstValue = dice[0];
      const sameValue = dice.every((die) => die.value === firstValue.value);
      if (allHeld && sameValue) {
        setTenzies(true);
      }
    }
  }, [dice]);
  const rollDice = () => {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
              };
        })
      );
    } else {
      setTenzies(false);
      generateNewDice();
    }
  };

  const holdDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
          border: "1px solid black",
          borderRadius: "10px",
          width: "30vw",
          height: "80vh",
          margin: "auto",
          background: "#F4F6F6",
          borderColor: "#D6DBDF",
        }}
      >
        <h1>Tenzies</h1>
        <div style={{ textAlign: "center", color: "#2E4053" }}>
          Roll until all dice are same.
          <br />
          Click each die to freeze it ats it current value between rolls.
        </div>
        <div
          style={{
            display: "grid",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gridTemplate: "auto auto / repeat(5,1fr)",
            gap: "20px",
            border: "1px solid black",
            padding: "30px 20px",
            borderRadius: "10px",
            background: "#EAECEE",
            borderColor: "#D6DBDF",
          }}
        >
          {dice.map((die) => {
            return (
              <Dice
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                holdDice={() => holdDice(die.id)}
              />
            );
          })}
        </div>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "1px solid #D6DBDF",
            width: "30%",
          }}
          onClick={rollDice}
        >
          {tenzies ? "You Won" : "Roll"}
        </button>
      </div>
    </>
  );
}

export default App;
