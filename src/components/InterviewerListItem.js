import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss'

export default function InterviewerListItem({ name, avatar, selected, setInterviewer }) {
  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  })
  return (
    <li className={interviewClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      <p>{selected && name}</p>
    </li>
  );
} 