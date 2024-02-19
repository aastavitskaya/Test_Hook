import {useEffect, useState} from "react";
import {makeTurn} from "../core/requests";

function Game({token}) {
  const [result, setResult] = useState(0);
  const [turn, setTurn] = useState(0);

  const spinRoulette = () => {
    const data = {
      "turn": turn,
    }
    makeTurn(data, setResult, setTurn);
  }

  useEffect(() => {
    setResult(0);
    setTurn(0);
  }, [token]);

  return (
    <div>
      {token ? (
        <div>
        <h3>Игра</h3>
          <button onClick={() => spinRoulette()}>Крутить рулетку</button>
          <span>{result ? ((result === 11) ? ' Джекпот' : `Выпало число ${result}`) : null }</span>
        </div>
        ) : <h3>Чтобы сыграть нужно авторизоваться</h3>}
      <hr />
    </div>
  )
}

export default Game;