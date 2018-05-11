import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart, Pie } from 'recharts';
import { fetchCandidates } from '../store/watch-party';
import { fetchActiveElection } from '../store/election'
import Election from '../../ethereum/election';

/**
 * COMPONENT
 */

class WatchParty extends Component {

  async componentDidMount () {
    const election = await Election('0xC14AD6de02704C2e805e0b383116FC0B373eFF3b');
    // const count = await election.methods.candidates(3).call();
    // console.log(count);
    // console.log(election);
    // election
    // .then(this.props.getCandidates(election));
    const userCommunityId = this.props.user.communityId;
    this.props.getCandidates(election);
    this.props.getActiveElection(userCommunityId);
  }

  render () {
    console.log('CANDIDATES! ', this.props.candidates[0] && this.props.candidates[0].name)
    let activeElection = this.props.activeElection;

    const data = [{name: 'A1', value: 100},
                  {name: 'A2', value: 300}]

    return (
      <div>
          {
            activeElection
            ? (
                <div key={activeElection.id}>
                  <h1>Welcome to the Watch Party for the {activeElection.name}!</h1>
                </div>
              )
            : <div>"There's no active election in your community!"</div>
          }

          <PieChart width={730} height={250}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
          </PieChart>
        <hr />
        <div>{this.props.candidates[0] && `${this.props.candidates[0].name} ${this.props.candidates[0].count}`}</div>
        <div>{this.props.candidates[1] && `${this.props.candidates[1].name} ${this.props.candidates[1].count}`}</div>
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
    communityId: state.user.communityId,
    activeElection: state.activeElection,
    candidates: state.candidates
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCandidates: (election) => {
      dispatch(fetchCandidates(election));
    },
    getActiveElection: (userCommunityId) => {
      dispatch(fetchActiveElection(userCommunityId));
    }
  }
}

export default connect(mapState, mapDispatch)(WatchParty);
