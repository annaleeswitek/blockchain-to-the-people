import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchActiveElection, fetchUpcomingElections, fetchBlockchainElections } from '../store/election';
import { Tab, Tabs, RaisedButton, Paper } from 'material-ui';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const style = {
  height: 400,
  width: 680,
  margin: 15,
  textAlign: 'center',
  display: 'inline-block',
};
/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {
    const userCommunityId = this.props.user.communityId;
    this.props.getActiveElection(userCommunityId)
    this.props.getUpcomingElections(userCommunityId);
    this.props.getBlockchainElections();
  }
  render() {
    let activeElection = this.props.activeElection
    console.log('ACTIVE!!!! ', activeElection)
    let upcomingElections = this.props.upcomingElections
    const startDate = activeElection.startDate ? activeElection.startDate.slice(0, 10) : null
    const startTime = activeElection.startDate ? activeElection.startDate.slice(11, 16) : null
    const endDate = activeElection.startDate ? activeElection.endDate.slice(0, 10) : null
    const endTime = activeElection.startDate ? activeElection.endDate.slice(11, 16) : null

    return (
      <div className="center">
        <h3>Welcome, {this.props.user.name}!</h3>
        <Tabs>
          <Tab label="Active Election">
          <Paper style={style} zDepth={2}>
            <div className="container">
              <div>
                <h2 style={styles.headline}>Active Election</h2>
                    {
                      activeElection
                      ? (
                          <div key={activeElection.id}>
                            <h3>{activeElection.name}</h3>
                            <h5>From: {startDate} at {startTime}</h5>
                            <h5>To: {endDate} at {endTime}</h5>
                            <p>{activeElection.description}</p>
                            <RaisedButton onClick={() => this.props.history.push('/voting-booth')} labelColor="white" primary={true} label="Vote Now!" />
                          </div>
                        )
                      : <div>"There's no active election in your community!"</div>
                    }
              </div>
            </div>
            </Paper>
          </Tab>
          <Tab label="Upcoming Elections">
          <Paper style={style} zDepth={2}>
            <div>
              <h2 style={styles.headline}>Upcoming Elections</h2>
              {
                upcomingElections.length
                ? upcomingElections.map(election => {
                    return (
                      <div key={election.id}>
                        <h3>{election.name}</h3>
                        <h5>From: {election.startDate}</h5>
                        <h5>To: {election.endDate}</h5>
                        <p>{election.description}</p>
                      </div>
                    )
                  })
                : <div>There are no upcoming elections in your community!</div>
              }
            </div>
            </Paper>
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
  }
}

export default connect(mapState, mapDispatch)(UserHome)
