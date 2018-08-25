import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayerToTeam } from '../../Actions/team';
import { deletePlayer } from '../../Actions/players';
import PlayerCard from '../PlayerCard/PlayerCard';


import './PlayerContainer.css';

class PlayerContainer extends Component {

  render() {
    const playerCards = this.props.players.map(player => {
      return <PlayerCard key={player.rank} player={player} />
     })
    return (
      <section>
        {playerCards}
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  team: state.team,
  players: state.players
});

const mapDispatchToProps = (dispatch) => ({
  addToTeam: player => dispatch(addPlayerToTeam(player)),
  deletePlayer: id => dispatch(deletePlayer(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);