import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayerToTeam } from '../../Actions/team';
import { deletePlayer } from '../../Actions/players';
import { addPick } from '../../Actions/picked';

import './PlayerCard.css';

class PlayerCard extends Component {

  handleAdd = () => {
    const { player, pick, round, currentOwner } = this.props;
    if (currentOwner === 'Pat') {
      player.pick = pick;
      player.round = round;
      player.owner = currentOwner;
      this.props.addToTeam(player);
      this.props.addPick(player);
      this.props.deletePlayer(player.rank);
      this.props.handlePicks();
    }
  }

  handleRemove = () => {
    const { player, pick, round, currentOwner } = this.props;
    if (currentOwner !== 'Pat') {
      player.pick = pick;
      player.round = round;
      player.owner = currentOwner;
      this.props.addPick(player);
      this.props.deletePlayer(player.rank);
      this.props.handlePicks();
    }
  }

  render() {
    const { player, classType, cardType } = this.props;
    return (
      <li className={classType % 2 === 0 ? "playerCard even" : "playerCard odd"}>
        {cardType === 'available' && <p>{player.rank}</p>}
        {cardType === 'picked' && <p>{player.pick + ((player.round - 1) * 14)}</p>}
        <p>{player.name}</p>
        <p>{player.position}</p>
        <p>{player.posRank}</p>
        <p>{player.team}</p>
        {cardType === 'picked' && <p>{player.round}</p>}
        {cardType === 'picked' && <p>{player.pick}</p>}
        {cardType === 'available' && <button  className="add-btn" onClick={this.handleAdd}>+</button>}
        {cardType === 'available' && <button className="remove-btn" onClick={this.handleRemove}>X</button>}
      </li>
    ) 
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToTeam: player => dispatch(addPlayerToTeam(player)),
  addPick: player => dispatch(addPick(player)),
  deletePlayer: id => dispatch(deletePlayer(id))
});

export default connect(null, mapDispatchToProps)(PlayerCard);