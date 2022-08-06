import { localToken, endPoint } from '../config/config';

/**
 * @function getCurrentUser
 * @description
 *   Fetch the current User and return a Promise that contains either the User Object or undefined
 * @return {Promise<[Object]>} The User Object | undefined
 * */
export const getCurrentUser = () =>
  fetchWrapper('/api/security/current-user').then((res) => {
    if (!res || !res.user) throw new Error('User not found');

    return res.user;
  });

class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super();
    this.message = message;
  }
}

class BadRequestError extends Error {
  constructor(message = 'Bad Request') {
    super();
    this.message = message;
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super();
    this.message = message;
    this.title = 'User Permissions Issue';
    this.toastrType = 'warning';
  }
}

export { BadRequestError, ForbiddenError, NotFoundError };

/**
 * @function fetchWrapper
 * @param {string} arg1 - REST method | url
 * @param {string} [url] - url
 * @param {Object} [body] - body of message
 * @description
 *   Wrapper for the fetch api that provides options defaults and base response code handling.
 * @return {Promise<Object>} A promise containing the deserialized response object.
 * */
export const fetchWrapper = (arg1, url, body, additionalOptions, headers) => {
  // if called with one argument, default to 'GET' method
  const _method = url ? arg1.toUpperCase() : 'GET';
  // if called without method arg, the first
  const _url = url || arg1;

  const urlWithBase = `${endPoint}/${_url}`;

  let localData = JSON.parse(localStorage.getItem(localToken));

  const options = {
    method: _method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache',
      token: localData?.token,

      ...headers,
    },
    body: body && JSON.stringify(body), // body can be undefined, that's ok
    ...additionalOptions,
  };

  return fetch(urlWithBase, options).then(handleResponse);
};

export const handleResponse = async (response) => {
  const res = await response.json();

  if (response.status === 401) {
    throw new BadRequestError(res.message);
  }

  if (response.status === 400) {
    throw new BadRequestError(res.message);
  }

  if (response.status === 403) {
    throw new ForbiddenError(res.message);
  }

  if (response.status === 404) {
    throw new NotFoundError(res.message);
  }

  if (response.status === 500) {
    throw new Error(res.message);
  }

  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      `There has been an error. Response status: ${response.status}`
    );
  }

  return res;
};
