import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";

export function setCurrentUser(user) {
  // send to our redux reducer
  return {
    type: SET_CURRENT_USER,
    user
  };
}

// function to run to sign up or login successfully
// userData come in from the request
export function authUser(type, userData) {
  return dispatch => {
    // wrap our thunk in a promise so we can wait for the API call
    // another promise to make sure to wait until the api call is finished
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          dispatch(setCurrentUser(user));
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
          reject(); // indicate the API call failed
        });
    });
  };
}
