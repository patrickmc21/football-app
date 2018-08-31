import React, { Component } from 'react';
import { connect } from 'react-redux';

import './TeamContainer.css';

class TeamContainer extends Component {
  render() {
    const { team } = this.props;
    const players = Object.keys(team).map((player, i) => {
      return (
        <li key={i}>
          <p>{player}: {team[player] ? team[player].name : "empty"}</p>
          {team[player] && <p>Round: {team[player] ? team[player].round : ""}</p>}
          {team[player] && <p>Pick: {team[player] ? team[player].pick : ""}</p>}
        </li>
      )
    });
    return (
      <section className="team-container">
        <article className="team-wrapper">
            <h2>My team:</h2>
            <ul className="team-list">
              {players}
            </ul>
        </article>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  team: state.team
});

export default connect(mapStateToProps)(TeamContainer)