export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const foundDays = state.days.find(item => item.name === day);
  if (!foundDays) {
    return [];
  }
  return foundDays.appointments.map((id) => state.appointments[id])
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const findApp = state.interviewers;
  let result = {}
  for (const id in findApp) {
    if (interview.interviewer === findApp[id].id) {
      result = { student: interview.student, interviewer: findApp[id] }
    }
  }
  return result;
}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const found = state.days.find(item => item.name === day);
  if (!found) {
    return [];
  }
  return found.interviewers.map((id) => state.interviewers[id])
}