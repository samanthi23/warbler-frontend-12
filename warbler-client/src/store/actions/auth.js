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
    // before we dispatch anything
    return new Promise((resolve, reject) => {
      // type sign up / signin ${type}
      // post request
      return apiCall("post", `/api/auth/${type}`, userData)
      // .then(data), destructure what we get back from the response (({token, ...user}))
      // token and then the rest of the information we'll call that user
        .then(({ token, ...user }) => {
          // key is jwtToken and a value we get back data.token
          localStorage.setItem("jwtToken", token);
          // then dispatch our current user
          // create current user in redux store
          dispatch(setCurrentUser(user));
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
          reject(); // indicate the API call failed
        });
    });
  };
}
