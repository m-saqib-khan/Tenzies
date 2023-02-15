import React from "react";

export default function Dice(props) {
  return (
    <div
      style={{
        border: props.isHeld ? "none" : "1px solid #D5D8DC",
        padding: "10px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: props.isHeld ? "#52BE80" : "#ffff",
        fontSize:"20px"
      }}
      onClick={props.holdDice}
    >
      {props.value}
    </div>
  );
}
