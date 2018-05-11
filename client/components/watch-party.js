import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidates } from '../store/watch-party';
import DonutChart from './donut-chart';
import BarGraph from './bar-chart';
import { RaisedButton } from 'material-ui';
import { fetchActiveElection } from '../store/election'
import Election from '../../ethereum/election';

/**
 * COMPONENT
 */

class WatchParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchView: false,
      GraphName: false,
      data: [ {name: 'Group A', value: 400, fill: '#8884d8'},
              {name: 'Group B', value: 300, fill: '#9cacf1'},
              {name: 'Group C', value: 300, fill: '#8dd1e1'},
              {name: 'Group D', value: 200, fill: '#82ca9d'},
              {name: 'Group E', value: 278, fill: '#a4de6c'},
              {name: 'Group F', value: 189, fill: '#d0ed57'}
            ]
    }
    this.election = null;
  }

    async componentDidMount () {

    // Promise.all([this.election, newVoteEvent])
    //   .then(([foundElection, voteEvent]) => {
    //     voteEvent.on((error, result) => {
    //     if (error) console.log('error here', error);
    //     console.log("hey! newVoteEvent was triggered! Yay ", result);
    //   });
    // })
    // .catch(console.log('there is an error!'));
    this.election = await Election(this.props.blockchainAddress);
    const newVoteEvent = await this.election.events.CandidateLog({});

    newVoteEvent.on((error, result) => {
      if (error) console.log('error here', error);
      console.log("hey! newVoteEvent was triggered! Yay ", result);
    });


    // const count = await election.methods.candidates(3).call();
    // console.log(count);
    // console.log(election);
    // election
    // .then(this.props.getCandidates(election));
    const userCommunityId = this.props.user.communityId;
    this.props.getActiveElection(userCommunityId);
  }

  render () {
    let activeElection = this.props.activeElection;

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
          {
            this.state.GraphName
            ? <RaisedButton  primary={true} label="Switch to Pie Chart" onClick={() => this.setState({switchView: !this.state.switchView, GraphName: !this.state.GraphName})} />
            : <RaisedButton  primary={true} label="Switch to Bar Graph" onClick={() => this.setState({switchView: !this.state.switchView, GraphName: !this.state.GraphName})} />
          }
          {
            this.state.switchView
            ? <BarGraph data={this.state.data} />
            : <DonutChart data={this.state.data} />
          }
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
    candidates: state.activeElection.candidates,
    blockchainAddress: state.activeElection.blockchainAddress
  }
}

const mapDispatch = (dispatch) => {
  return {
    getActiveElection: (userCommunityId) => {
      dispatch(fetchActiveElection(userCommunityId));
    }
  }
}

export default connect(mapState, mapDispatch)(WatchParty);
