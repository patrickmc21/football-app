import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerCard from '../PlayerCard/PlayerCard';


import './PlayerContainer.css';

class PlayerContainer extends Component {
  constructor() {
    super();
    this.state = {
      pick: 1,
      round: 1
    }
  }

  handlePicks = () => {
    if (this.state.pick < 14) {
      console.log('in')
      const pick = this.state.pick + 1;
      this.setState({ pick });
    } else {
      const pick = 1;
      const round = this.state.round + 1;
      this.setState({ pick, round});
    }
  }

  render() {
    const { pick, round } = this.state;
    const playerCards = this.props.players.map((player, i) => {
      return <PlayerCard key={player.rank} player={player} pick={pick} round={round} handlePicks={this.handlePicks} classType={i}/>
     })
    return (
      <section className="player-section">
        <ul className="player-list">
          {playerCards}
        </ul>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  team: state.team,
  players: state.players
});

export default connect(mapStateToProps)(PlayerContainer);