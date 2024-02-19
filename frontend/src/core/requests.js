import axios from "axios";
import {API_URL, BASE_URL} from './consts'
import Cookies from "universal-cookie";
import {toast} from 'react-toastify';

const getHeaders = () => {
  let headers = {
    "Content-Type": "application/json"
  };
  const cookie = new Cookies();
  const token = cookie.get('token');
  if (token) {
    headers['Authorization'] = 'Token ' + token
  }
  return headers;
}

export const getToken = (username, password, setToken) => {
  const data = {
    'username': username,
    'password': password
  };
  const headers = getHeaders();
  axios.post(
    BASE_URL + 'api-token-auth/',
    data,
    {'headers': headers}
  ).then(response => {
      saveToken(response.data['token'], setToken);
      toast('Добро пожаловать на борт');
    }
  ).catch(error => {
    console.log(error)
    toast('Проверьте правильность логина с паролем');
  });
}

export const saveToken = (token, setToken) => {
  const cookie = new Cookies();
  cookie.set('token', token);
  cookie.set('SameSite', 'Lax');
  setToken(token);
}

export const logout = (setToken) => {
  const cookie = new Cookies();
  cookie.set('token', '');
  setToken('');
}

export const restoreToken = (setToken) => {
  const cookie = new Cookies();
  const token = cookie.get('token');
  setToken(token);
}

export const register = (username, password, setToken) => {
  const data = {
    'username': username,
    'password': password
  };
  const headers = getHeaders();
  axios.post(
    API_URL + 'players/',
    data,
    {'headers': headers}
  ).then(response => {
      getToken(username, password, setToken);
      toast('Вы успешно зарегистрированы');
    }
  ).catch(error => {
    console.log(error);
    toast('Это имя пользователя уже используется или пароль неподходящий');
  });
}

export const fetchStatistic = (setStatistic) => {
  const headers = getHeaders();
  axios.get(
    BASE_URL + 'statistic/',
    {'headers': headers}
  ).then(response => {
      setStatistic(response.data);
    }
  ).catch(error => {
    console.log(error);
  });
}

export const makeTurn = (data, setResult, setTurn) => {
  const headers = getHeaders();
  axios.post(
    API_URL + 'spins/',
    data,
    {'headers': headers}
  ).then(response => {
    setTurn(response.data.turn);
    setResult(response.data.result);
  }).catch(error => console.log(error))
}
