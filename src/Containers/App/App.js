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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <main>
          <PlayerContainer />
          <TeamContainer />
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPlayers: players => dispatch(addPlayers(players))
});

export default connect(null, mapDispatchToProps)(App);
