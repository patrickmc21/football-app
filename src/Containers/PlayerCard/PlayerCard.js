import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayerToTeam } from '../../Actions/team';
import { deletePlayer } from '../../Actions/players';

import './PlayerCard.css';

class PlayerCard extends Component {

  handleAdd = () => {
    const { player, pick, round } = this.props;
    player.pick = pick;
    player.round = round;
    this.props.addToTeam(player);
    this.props.deletePlayer(player.rank);
    this.props.handlePicks();
  }

  handleRemove = () => {
    const { player } = this.props;
    this.props.deletePlayer(player.rank);
    this.props.handlePicks();
  }

  render() {
    const { player, classType } = this.props;
    return (
      <li className={classType % 2 === 0 ? "playerCard even" : "playerCard odd"}>
        <p>{player.rank}</p>
        <p>{player.name}</p>
        <p>{player.position}</p>
        <p>{player.posRank}</p>
        <p>{player.team}</p>
        <button  className="add-btn" onClick={this.handleAdd}>+</button>
        <button className="remove-btn" onClick={this.handleRemove}>X</button>
      </li>
    ) 
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToTeam: player => dispatch(addPlayerToTeam(player)),
  deletePlayer: id => dispatch(deletePlayer(id))
});

export default connect(null, mapDispatchToProps)(PlayerCard);