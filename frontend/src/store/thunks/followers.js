



import { getUsersFollowers } from "../actions/followers.js";
import { setErrors, resetErrors } from "../actions/errors.js";









const thunk_getUsersFollowers = () => async (dispatch) => {
  const response = await fetch("/api/users/followers", {
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
  dispatch(getUsersFollowers(data));
};





export {
  thunk_getUsersFollowers,

}
