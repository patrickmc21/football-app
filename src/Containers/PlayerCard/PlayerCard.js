import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayerToTeam } from '../../Actions/team';
import { deletePlayer } from '../../Actions/players';

import './PlayerCard.css';

class PlayerCard extends Component {

  handleAdd = () => {
    const { player } = this.props;
    this.props.addToTeam(player);
    this.props.deletePlayer(player.rank);
  }

  handleRemove = () => {
    const { player } = this.props;
    this.props.deletePlayer(player.rank);
  }

  render() {
    const { player } = this.props;
    return (
      <article>
        <p>{player.rank}</p>
        <p>{player.name}</p>
        <p>{player.position}</p>
        <p>{player.posRank}</p>
        <p>{player.team}</p>
        <button onClick={this.handleAdd}>Add</button>
        <button onClick={this.handleRemove}>Remove</button>
      </article>
    ) 
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToTeam: player => dispatch(addPlayerToTeam(player)),
  deletePlayer: id => dispatch(deletePlayer(id))
});

export default connect(null, mapDispatchToProps)(PlayerCard);