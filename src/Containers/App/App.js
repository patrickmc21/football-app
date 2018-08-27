import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayers } from '../../Actions/players';
import playerData from '../../scrape/players-data.json';
import PlayerContainer from '../PlayerContainer/PlayerContainer';
import TeamContainer from '../TeamContainer/TeamContainer';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.addPlayers(playerData);
  }

  saveTeamData = () => {
    const { team } = this.props;
    let readyToSave = true;
    Object.keys(team).forEach(player => {
      if (!team[player]) {
        readyToSave = false;
      }
    });
    if (readyToSave) {
      const savedTeam = JSON.stringify(team);
      localStorage.setItem(`${Date.now()}-team`, savedTeam);      
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Draft Day</h1>
          <button 
            className="save-btn"
            onClick={this.saveTeamData}>
            Save Team
          </button>
        </header>
        <main>
          <div className="main-overlay">
            <PlayerContainer />
            <TeamContainer />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  team: state.team
});

const mapDispatchToProps = (dispatch) => ({
  addPlayers: players => dispatch(addPlayers(players))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
