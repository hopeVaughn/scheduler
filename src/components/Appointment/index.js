import React from "react";
import 'components/Appointment/styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from './Status';
import Confirm from './Confirm'
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment({ time, id, interview, interviewers, bookInterview, cancelInterview }) {

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    if (interviewer) {
      transition(SAVING)
      bookInterview(id, interview)
        .then((res) => {
          if (res === 204) {
            transition(SHOW)
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  const deleteApp = (name, interviewer) => {
    const interview = null
    transition(DELETE)
    cancelInterview(id, interview)
      .then((res) => {
        if (res === 204) {
          transition(EMPTY, true)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE"

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => {

        transition(CREATE);
      }} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={deleteApp}
        />
      )}
      {mode === CREATE && <Form
        onSave={save}
        onCancel={back}
        interviewers={interviewers}
        onDelete={deleteApp}
      />}
      {mode === SAVING && (
        <Status />
      )}
      {mode === DELETE && (
        <Confirm />
      )}
    </article>
  )
}
