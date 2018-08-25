import React, { Component } from 'react';
import { connect } from 'react-redux';

import './TeamContainer.css';

class TeamContainer extends Component {
  render() {
    return (
      <section>
        Team Container
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  team: state.team
});

export default connect(mapStateToProps)(TeamContainer)