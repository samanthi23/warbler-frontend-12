import axios from "axios";

// import axios from "axios";

export function apiCall(method, path, data) {
  // returns a new promise
  // resolve promise when our actions resolved
  // if it doesn't go well then return an error .then .catch
  // {} an object called response and a sub object called data
  // import to store/actions/auth.js
  // new Promise accepts a function
  return new Promise((resolve, reject) => {
    return axios[method](path, data)
      .then(res => {
        // with a successful request we always get a sub object of data, res.data
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      });
  });
}
