import React from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";
import { useState } from "react";

export default function Form({ student, interviewer, interviewers, onSave, onCancel }) {
  const [studentInfo, setStudentInfo] = useState(student || "");
  const [interviewerInfo, setInterviewerInfo] = useState(interviewer || null)
  const [error, setError] = useState("");

  const reset = () => {
    setStudentInfo('');
    setInterviewerInfo(null)
  }
  const cancel = () => {
    reset();
    onCancel();
  }

  function validate() {
    if (studentInfo === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewerInfo === null) {
      setError("Please select an interviewer");
      return;
    }

    setError("");
    onSave(studentInfo, interviewerInfo);
  }

  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()} >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={studentInfo}
            onChange={(e) => setStudentInfo(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewerInfo}
          onChange={setInterviewerInfo}
        /* your code goes here */
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}