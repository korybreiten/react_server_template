import tokenService from './tokenService';

const BASE_URL = '/users/';

export function join(creds) {
  return fetch(BASE_URL + 'join', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    if (res.ok) {
      console.log('Sign Up Success!')
      return res.json();
    } else {
      throw new Error('Sign Up Error!');
    };
  })
  .then(({token}) => tokenService.setToken(token));
}

export function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then((res) => {
    if (res.ok) {
      console.log('Log In Success!')
      return res.json();
    } else {
      throw new Error('Invalid Credentials!');
    };
  })
  .then(({token}) => tokenService.setToken(token));
}

export function logout() {
  tokenService.removeToken();
}

export function getToken() {
  return tokenService.getUserFromToken();
}

export function update(formData) {
  let token = getToken();
  return fetch(BASE_URL + token.userId, {
      method: 'PUT',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenService.getToken()
          }),
      body: JSON.stringify(formData)
  })
  .then(res => {
      if (res.ok) return res.json();
      throw new Error('Profile Update Error!');
  })
}

export function deleteProfile() {
  let token = getToken();
  return fetch(BASE_URL + 'delete/' + token.userId, {
      method: 'DELETE',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenService.getToken()
          })
  })
  .then(res => {
      if (res.ok) return res.json();
      throw new Error('Profile Delete Error!');
  })
}

export function getOne(formData) {
  return fetch(BASE_URL + 'one/' + formData.userId, {
      method: 'GET'
  })
  .then(res => {
      if (res.ok) return res.json();
      throw new Error('Get User Error!');
  })
}

export function getAll() {
  return fetch(BASE_URL + 'all', {
      method: 'GET'
  })
  .then(res => {
      if (res.ok) return res.json();
      throw new Error('Get User Error!');
  })
}

export default {
  join,
  login, 
  getToken,
  update,
  deleteProfile,
  getOne,
  getAll,
  logout
};