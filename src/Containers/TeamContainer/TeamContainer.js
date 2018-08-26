import React, { Component } from 'react';
import { connect } from 'react-redux';

import './TeamContainer.css';

class TeamContainer extends Component {
  render() {
    const { team } = this.props;
    return (
      <section>
        <article>
          <div>
            <ul>
              <li>
                QB: {team.QB || "empty"}
              </li>
              <li>
                RB: {team.RB1 || "empty"}
              </li>
              <li>
                RB: {team.RB2 || "empty"}
              </li>
              <li>
                WR: {team.WR2 || "empty"}
              </li>
              <li>
                WR: {team.WR2 || "empty"}
              </li>
              <li>
                TE: {team.TE || "empty"}
              </li>
              <li>
                FLEX: {team.FLEX || "empty"}
              </li>
              <li>
                DST: {team.DST || "empty"}
              </li>
              <li>
                K: {team.K || "empty"}
              </li>
              <li>
                BE: {team.BE1 || "empty"}
              </li>
              <li>
                BE: {team.BE2 || "empty"}
              </li>
              <li>
                BE: {team.BE3 || "empty"}
              </li>
              <li>
                BE: {team.BE4 || "empty"}
              </li>
              <li>
                BE: {team.BE5 || "empty"}
              </li>
              <li>
                BE: {team.BE6 || "empty"}
              </li>
              <li>
                BE: {team.BE7 || "empty"}
              </li>
            </ul>
          </div>
        </article>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  team: state.team
});

export default connect(mapStateToProps)(TeamContainer)