import React, { Component } from 'react';
import { connect } from 'react-redux';
import DonutChart from './donut-chart';
import BarGraph from './bar-chart';
import { RaisedButton } from 'material-ui';
import { fetchActiveElection } from '../store/election'
import Election from '../../ethereum/election';

/**
 * COMPONENT
 */

window.Election = Election

class WatchParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchView: false,
      GraphName: false
    }
    this.election = null;
  }

    async componentDidMount () {
      setTimeout(this.toggleView, 50);
    this.election = await Election(this.props.blockchainAddress);
    const userCommunityId = this.props.user.communityId;
    this.props.getActiveElection(userCommunityId);
    console.log('this.props.state', this.props.state);
  }

  toggleView = () => {
    this.setState(({GraphName, switchView}) => ({
      switchView: !switchView,
      GraphName: !GraphName
    }))
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
                  {
                    this.state.GraphName
                    ? <RaisedButton  primary={true} label="Switch to Bar Graph" onClick={() => this.toggleView()} />
                    : <RaisedButton  primary={true} label="Switch to Pie Chart" onClick={() => this.toggleView()} />
                  }
                  {
                    this.state.switchView
                    ? <DonutChart />
                    : <BarGraph />
                  }
                </div>
              )
            : <div>"There's no active election in your community!"</div>
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
    state: state,
    newVotes: state.newVotes,
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
