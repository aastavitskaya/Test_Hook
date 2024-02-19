import {useState} from 'react';
import {getToken, register, logout} from "../core/requests";


function AuthForm({token, setToken}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    getToken(username, password, setToken);
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    register(username, password, setToken);
  }

  const handleLogout = (event) => {
    event.preventDefault();
    logout(setToken);
  }

  return (
    <div>
      {token
        ? (
          <div>
            <button onClick={(event) => handleLogout(event)}>Выйти</button>
          </div>
        )
        : (
          <fieldset>
            <form onSubmit={(event) => handleSubmit(event)}>
              <label>
                Имя пользователя:
                <input
                  type="text"
                  name='username'
                  onChange={({target}) => setUsername(target.value)}
                />
              </label>
              <label>
                Пароль:
                <input
                  type="password"
                  name='password'
                  onChange={({target}) => setPassword(target.value)}
                />
              </label>
              <input type="submit" value="Войти"/>
            </form>
            <form onSubmit={(event) => handleSignUp(event)}>
              <input type="submit" value="Зарегистрироваться"/>
            </form>

          </fieldset>
        )}
      <hr/>
    </div>
  );
}

export default AuthForm;