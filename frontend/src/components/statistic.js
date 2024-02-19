import {fetchStatistic} from "../core/requests";
import {useEffect, useState} from "react";
import {STATISTIC_REFRESH_FREQUENCY} from "../core/consts";


function PlayerData({player}) {
  return (
    <tr key={player.id}>
      <th>{`${player.id}`}</th>
      <th>{`${player.total_games}`}</th>
      <th>{`${player.avg_spins}`}</th>
    </tr>
  )
}

function Statistic() {
  const [statistic, setStatistic] = useState('');

  useEffect(() => {
    setTimeout(() => {
      fetchStatistic(setStatistic)
    }, STATISTIC_REFRESH_FREQUENCY)
  });


  return (
    <div>
      {(statistic) ? (
        <div>
          <h3>Статистика</h3>
          <h4>Раунды</h4>
          <table>
            <thead>
            <tr>
              <th>Сыграно раундов</th>
              <th>Количество игроков</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>{`${statistic.total_games}`}</th>
              <th>{`${statistic.total_players}`}</th>
            </tr>
            </tbody>
          </table>
          <h4>Лучшие игроки</h4>
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Сыграно раундов</th>
              <th>Среднее число вращений</th>
            </tr>
            </thead>
            <tbody>
              {statistic.top_players.map(player => {
                return <PlayerData key={player.id} player={player}/>
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>Загрузка статистики</h3>
      )}
    </div>
  )
}

export default Statistic;