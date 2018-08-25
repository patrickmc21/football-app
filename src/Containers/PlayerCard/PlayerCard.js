import React from 'react';

import './PlayerCard.css';

const PlayerCard = ({player}) => {
  return (
    <article>
      <p>{player.rank}</p>
      <p>{player.name}</p>
      <p>{player.position}</p>
      <p>{player.posRank}</p>
      <p>{player.team}</p>
    </article>
  )
}

export default PlayerCard;