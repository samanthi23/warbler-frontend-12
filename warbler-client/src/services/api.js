import axios from "axios";

export function apiCall(method, path, data) {
  // returns a new promise
  // resolve promise when our actions resolved
  // if it doesn't go well then return an error .then .catch
  // {} an object called response and a sub object called data
  // import to store/actions/auth.js
  return new Promise((resolve, reject) => {
    return axios[method](path, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      });
  });
}
