import React, {useEffect, useState} from 'react';
import Header from './components/header'
import {restoreToken} from './core/requests'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthForm from "./components/auth-form";
import Statistic from "./components/statistic";
import Game from "./components/game";

function App() {
  const [token, setToken] = useState('')


  useEffect(() => {
    restoreToken(setToken)
  }, []);

  return (
    <div>
      <ToastContainer/>
      <Header/>
      <AuthForm token={token} setToken={setToken}/>
      <Game token={token} />
      <Statistic/>
    </div>
  );
}
export default App;
