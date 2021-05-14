


import { getUsersPolls } from "../actions/polls.js";
import { setErrors, resetErrors } from "../actions/errors.js";





const thunk_getUsersPolls = () => async (dispatch) => {
  const response = await fetch("/api/polls", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(getUsersPolls(data));
};





export {
  thunk_getUsersPolls,

}
