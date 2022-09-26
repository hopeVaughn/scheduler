import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useApllicationData() {

  const updateSpots = (spot) => {
    const selectedDay = state.days.find(day => day.name === state.day);
    const dayID = selectedDay.id;
    const updateDays = [...state.days];
    updateDays.forEach(day => day.id === dayID ? day.spots += spot : day);
    return updateDays;
  };

  const [state, setState] = useState({ day: 'Monday', days: [], appointments: {}, interviewers: {} });

  const handleDay = (name) => {
    setState(prev => ({ ...prev, day: name }))
  }

  const setDay = day => setState({ ...state, day });

  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const days = updateSpots(1)

    return axios.delete(`api/appointments/${appointment.id}`, appointment)
      .then((res) => {
        const status = res.status
        setState(prev => ({
          ...prev,
          appointments,
          days
        }));
        return status;
      })
  }

  const bookInterview = (id, interview, mode) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = mode === "EDIT" ? updateSpots(0) : updateSpots(-1)
    return axios.put(`api/appointments/${appointment.id}`, appointment)
      .then((res) => {
        const status = res.status
        console.log(res);
        setState(prev => ({
          ...prev,
          appointments,
          days
        }));
        return status;
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        const days = all[0].data
        const appointments = all[1].data
        const interviewers = all[2].data
        setState(prev => ({ ...prev, days, appointments, interviewers }));
      })
      .catch((error) => {
        console.log(error.response);
      })
  }, [])

  return { state, bookInterview, cancelInterview, handleDay, setDay }
}