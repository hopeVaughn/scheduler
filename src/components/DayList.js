// Parent of DayListItems. Passes props down.
import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, value, onChange }) {
  return (
    <ul>
      {days.map(({ id, name, spots }) => {
        return <DayListItem key={id} name={name} spots={spots} setDay={onChange} selected={name === value} ></DayListItem>
      })}
    </ul>
  );
}

