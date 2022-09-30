import React from "react";
import 'components/Appointment/styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from './Status';
import Confirm from './Confirm'
import Form from "./Form";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE"
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
          transition(ERROR_SAVE, true)
        })
    }
  }

  const deleteApp = (name, interviewer) => {
    transition(DELETING, true)
    cancelInterview(id)
      .then((res) => {
        if (res === 204) {
          transition(EMPTY, true)
        }
      })
      .catch((err) => {
        transition(ERROR_DELETE, true)
      })
  }


  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => {
        transition(CREATE);
      }} />}

      {mode === SAVING && (
        <Status message={SAVING} />
      )}

      {mode === DELETING && (
        <Status message={DELETING} />
      )}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(DELETE)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === EDIT && <Form
        interviewers={interviewers}
        student={interview.student}
        interviewer={interview.interviewer.id}
        onCancel={() => back()}
        onSave={save}
      />
      }

      {mode === CREATE && <Form
        onSave={save}
        onCancel={back}
        interviewers={interviewers}
      />}


      {mode === DELETE && (
        <Confirm
          message={`Are you sure you would like to delete?`}
          onCancel={() => back()}
          onConfirm={deleteApp}
        />
      )}

      {mode === ERROR_SAVE &&
        <Error
          message={"Error Saving"}
          onClose={() => back()}
        />}
      {mode === ERROR_DELETE &&
        <Error
          message={"Error Deleting"}
          onClose={() => back()}
        />
      }
    </article>
  )
}
