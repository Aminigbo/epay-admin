export function route(state, history) {
  // if (state.loggedInUser.user.meta.schoolmode === true && state.loggedInUser.user.meta.school === null) {
  if (state.loggedInUser.user.meta.school === null) {
    history.push("/setschool");
  } else if (
    state.loggedInUser.user.meta.gender === null ||
    state.loggedInUser.user.meta.DOB === null
  ) {
    history.push("/updateprofile");
  }
}
