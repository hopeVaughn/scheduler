import React from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

import "components/Application.scss";

export default function Application() {
  const {
    state,
    handleDay,
    bookInterview,
    cancelInterview
  } = useApplicationData()

  const interviewers = getInterviewersForDay(state, state.day)
  const appointmentForDay = getAppointmentsForDay(state, state.day)
  const appointments = appointmentForDay.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        cancelInterview={cancelInterview}
        bookInterview={bookInterview}
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={handleDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment
          key="last"
          time="5pm"
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      </section>
    </main>
  );
}
