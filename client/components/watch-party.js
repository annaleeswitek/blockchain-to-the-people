import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart, Pie } from 'recharts';
import { fetchActiveElections } from '../store/user-home';
import { fetchCandidatesActiveElection } from '../store/watch-party';

/**
 * COMPONENT
 */
class WatchParty extends Component {

  componentDidMount () {
    this.props.fetchActiveElections();
    // this.props.fetchCandidatesActiveElection(this.props.user.communityId);
    // console.log('this.props.user.communityId', this.props.user.communityId)

  }

  render () {
    // console.log('this.props.user.communityId:', this.props.user.communityId)
    let active = this.props.activeElections.filter(election => election.communityId === this.props.user.communityId)

    const data = [{name: 'A1', value: 100},
                  {name: 'A2', value: 300}]

    return (
      <div>

          {
            active.length
            ? active.map(election => {
              return (
                <div key={election.id}>
                  <h1>Welcome to the Watch Party for the {election.name}!</h1>
                </div>
              )
            })
            : <div>"There's no active election in your community!"</div>
          }

          <PieChart width={730} height={250}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
          </PieChart>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    activeElections: state.activeElections,
    state,
    activeCandidates: state.activeCandidates

  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchActiveElections: () => {
      dispatch(fetchActiveElections());
    }
    // fetchCandidatesActiveElection: (id) => {
    //   dispatch(fetchCandidatesActiveElection(id));
    // }
  }
}

export default connect(mapState, mapDispatch)(WatchParty);
