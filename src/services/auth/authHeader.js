export default function authHeader() {
  let localData = JSON.parse(localStorage.getItem('localdealtoken'));

  if (localData && localData.hasOwnProperty('token')) {
    // for Node.js Express back-end
    return {
      'x-access-token': localData.token,
    };
  } else {
    return {};
  }
}
