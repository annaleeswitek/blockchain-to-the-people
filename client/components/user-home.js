import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchActiveElection, fetchUpcomingElections, fetchBlockchainElections, fetchActiveElectionFromBlockchain } from '../store/election';
import { Slider, Tab, Tabs, RaisedButton} from 'material-ui';
// import Election from '../../ethereum/election';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

/**
 * COMPONENT
 */
class UserHome extends Component {
  async componentDidMount() {
    const userCommunityId = this.props.user.communityId;
    this.props.getActiveElection(userCommunityId)
    // this.props.getActiveElectionFromBlockchain(this.props.activeElection.blockchainAddress);
    this.props.getUpcomingElections(userCommunityId);
    this.props.getBlockchainElections();

    // console.log('blockchain address for active election', this.props.activeElection.blockchainAddress)
    // this.election = await Election(this.props.blockchainAddress);
  }
  render() {
    let activeElection = this.props.activeElection
    console.log('ACTIVE!!!! ', activeElection)
    let upcomingElections = this.props.upcomingElections

    return (
      <div>
        <h3>Welcome, {this.props.user.name}</h3>
        <Tabs>
          <Tab label="Active Election" >
            <div className="container">
              <div>
                <h2 style={styles.headline}>Active Election</h2>
                <h4>Active Election</h4>
                    {
                      activeElection
                      ? (
                          <div key={activeElection.id}>
                            <h5>{activeElection.name}</h5>
                            <h5>From: {activeElection.startDate}</h5>
                            <h5>To: {activeElection.endDate}</h5>
                            <RaisedButton onClick={() => this.props.history.push('/voting-booth')} labelColor="white" primary={true} label="Vote Now!" />
                          </div>
                        )
                      : <div>"There's no active election in your community!"</div>
                    }
              </div>
            </div>
          </Tab>
          <Tab label="Upcoming Elections" >
            <div>
              <h2 style={styles.headline}>Upcoming Elections</h2>
              {
                upcomingElections.length
                ? upcomingElections.map(election => {
                    return (
                      <div key={election.id}>
                        <h5>{election.name}</h5>
                        <h5>From: {election.startDate}</h5>
                        <h5>To: {election.endDate}</h5>
                      </div>
                    )
                  })
                : <div>There are no upcoming elections in your community!</div>
              }
            </div>
          </Tab>
        </Tabs>
        <div>{this.props.blockchainElections.map((election, idx) => <div key={idx}>{election}</div>)}</div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // blockchainActiveElection: state.blockchainActiveElection,
    blockchainElections: state.blockchainElections,
    user: state.user,
    activeElection: state.activeElection,
    upcomingElections: state.elections
  }
}

const mapDispatch = (dispatch) => {
  return {
    getBlockchainElections: () => {
      dispatch(fetchBlockchainElections());
    },
    getActiveElection: (userCommunityId) => {
      dispatch(fetchActiveElection(userCommunityId));
    },
    getUpcomingElections: (userCommunityId) => {
      dispatch(fetchUpcomingElections(userCommunityId));
    },
    // getActiveElectionFromBlockchain: (address) => {
    //   dispatch(fetchActiveElectionFromBlockchain(address));
    // }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {

// }
