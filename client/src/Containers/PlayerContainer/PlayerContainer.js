import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerCard from '../PlayerCard/PlayerCard';


import './PlayerContainer.css';

class PlayerContainer extends Component {
  constructor() {
    super();
    this.state = {
      pick: 1,
      round: 1,
      available: true,
      selected: false,
      selectedTeam: 'all',
      positionFilter: {
        all: true,
        QB: false,
        RB: false,
        WR: false,
        TE: false,
        FLEX: false,
        DST: false,
        K: false
      },
      owners: [
        'MT',
        'Ben',
        'Marc',
        'Willemyns',
        'Himbo',
        'Willy',
        'Steve',
        'Pat',
        'Colton',
        'Cole',
        'Jonny',
        'Willis',
        'Brooks',
        'N8'
      ]
    }
  }

  handlePicks = () => {
    if (this.state.pick === 1 && this.state.round > 1 && this.state.round < 17) {
      const url = 'http://localhost:3000/round';
      const body = {
        round: this.state.round,
        picks: this.props.picked.slice(-14)
      };
      const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json'
        }
      };
      try {
        fetch(url, options)
      } catch (err) {
        console.log(err);
      }
    }
    if (this.state.pick < 14) {
      const pick = this.state.pick + 1;
      this.setState({ pick });
    } else {
      const pick = 1;
      const round = this.state.round + 1;
      this.setState({ pick, round});
    }
  }

  handleSelection = (e) => {
    const { value } = e.target;
    switch (value) {
      case 'available':
        this.setState({ available: true, selected: false });
        break;
      case 'selected':
        this.setState({ available: false, selected: true });
        break;
    }
  }

  handlePositionSelection = (e) => {
    const { positionFilter } = this.state;
    const { value } = e.target;
    const newState = {...positionFilter};

    const positions = Object.keys(positionFilter);

    positions.forEach(position => newState[position] = position === value);

    this.setState({ positionFilter: newState });

  }

  handleTeamSelection = (e) => {
    console.log(e.target)
    const { value } = e.target;

    this.setState({ selectedTeam: value });
  }

  handlePlayerCards = () => {
    const { players, picked } = this.props;
    let playerCards;

    if (this.state.available) {
      const filteredByPosition = this.handlePositionFilter(players);
      const filteredByTeam = this.handleTeamFilter(filteredByPosition);
      return filteredByTeam;
    }

    if (this.state.selected) {
      const filteredByPosition = this.handlePositionFilter(picked);
      const filteredByTeam = this.handleTeamFilter(filteredByPosition);
      return filteredByTeam;
    }

    return playerCards;
  }

  handlePositionFilter = (players) => {
    const { positionFilter } = this.state;

    const filteredPlayers = Object.keys(positionFilter).reduce((playersList, positionType) => {
      if (positionFilter[positionType]) {
        players.forEach(player => {
          if (positionType === 'all') {
            playersList.push(player);
          }

          if (positionType === 'FLEX') {
            switch (player.position) {
              case 'RB':
              case 'WR':
              case 'TE':
                playersList.push(player);
                break;
              default:
                break;
            }
          }

          if (player.position === positionType) {
            playersList.push(player);
          }
        });
      }
      return playersList;
    }, []);

    return filteredPlayers;
  }

  handleTeamFilter = (players) => {
    const { selectedTeam } = this.state;
    if (selectedTeam === 'all') {
      return players;
    }
    const filteredPlayers = players.filter(player => player.team === selectedTeam);
    return filteredPlayers;
  }

  createTeams = () => {
    const { players } = this.props;

    const teamList = players.reduce((teams, player) => {
      if (!teams.find(team => player.team === team)) {
        teams.push(player.team);
      }
      return teams;
    }, ['all']);

    return teamList;
  }

  currentOwner = () => {
    const { pick, round, owners } = this.state;
    let owner;
    const reversedOwners = [...owners].reverse();

    if (round % 2 === 0) {
      owner = reversedOwners[pick - 1];
    } else {
      owner = owners[pick - 1];
    }

    return owner;
  }

  render() {
    const { pick, round, positionFilter } = this.state;
    const teams = this.createTeams();
    const teamOptions = teams.map(team => {
      return (
        <option
          key={team}
          name={team}
          value={team}
        >
          {team}
        </option>
      )
    })
    const players = this.handlePlayerCards();
    const playerCards = players.map((player, i) => {
      return (
        <PlayerCard 
          key={player.rank} 
          player={player} 
          pick={pick} 
          round={round} 
          handlePicks={this.handlePicks}
          currentOwner={this.currentOwner()}
          cardType={this.state.available ? 'available' : 'picked'} 
          classType={i}/>
      )
     })
    return (
      <section className="player-section">
        <h2>Round: {round}  Pick: {pick}</h2>
        <h3>On the clock: {this.currentOwner()}</h3>
        <form className="filter-form">
          <div>
            <label
              htmlFor="available">
              <input
                checked={this.state.available}
                id="available"
                name="players"
                value="available"
                type="radio"
                onChange={this.handleSelection}/>
                Available
            </label>
            <label htmlFor="selected">
              <input
                checked={this.state.selected}
                id="selected"
                name="players"
                value="selected"
                type="radio"
                onChange={this.handleSelection} />
              Selected
            </label>
          </div>
          <div>
            <label
              htmlFor="all">
              <input
                checked={positionFilter.all}
                id="all"
                name="positions"
                value="all"
                type="radio"
                onChange={this.handlePositionSelection}/>
                All
            </label>
            <label htmlFor="selected">
              <input
                checked={positionFilter.QB}
                id="QB"
                name="positions"
                value="QB"
                type="radio"
                onChange={this.handlePositionSelection} />
              QB
            </label>
            <label htmlFor="RB">
              <input
                checked={positionFilter.RB}
                id="RB"
                name="positions"
                value="RB"
                type="radio"
                onChange={this.handlePositionSelection} />
              RB
            </label>
            <label htmlFor="WR">
              <input
                checked={positionFilter.WR}
                id="WR"
                name="positions"
                value="WR"
                type="radio"
                onChange={this.handlePositionSelection} />
              WR
            </label>
            <label htmlFor="TE">
              <input
                checked={positionFilter.TE}
                id="TE"
                name="positions"
                value="TE"
                type="radio"
                onChange={this.handlePositionSelection} />
              TE
            </label>
            <label htmlFor="FLEX">
              <input
                checked={positionFilter.FLEX}
                id="FLEX"
                name="positions"
                value="FLEX"
                type="radio"
                onChange={this.handlePositionSelection} />
              FLEX
            </label>
            <label htmlFor="DST">
              <input
                checked={positionFilter.DST}
                id="DST"
                name="positions"
                value="DST"
                type="radio"
                onChange={this.handlePositionSelection} />
              DST
            </label>
            <label htmlFor="K">
              <input
                checked={positionFilter.K}
                id="K"
                name="positions"
                value="K"
                type="radio"
                onChange={this.handlePositionSelection} />
              K
            </label>
          </div>
          <div>
            <select onChange={this.handleTeamSelection}>
              {teamOptions}
            </select>
          </div>
        </form>
        {round < 17 &&
          <ul className="player-list">
            {playerCards}
          </ul>
        }
        {
          round === 17 &&
          <h2>Draft Over!</h2>
        }
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  team: state.team,
  players: state.players,
  picked: state.picked
});

export default connect(mapStateToProps)(PlayerContainer);