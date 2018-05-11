import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchActiveElection, fetchUpcomingElections, fetchBlockchainElections } from '../store/election';
import { Slider, Tab, Tabs } from 'material-ui';

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
    this.props.getActiveElection(userCommunityId);
    this.props.getUpcomingElections(userCommunityId);
    this.props.getBlockchainElections();
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
                <p>
                <h4>Active Election</h4>
                    {
                      activeElection
                      ? (
                          <div key={activeElection.id}>
                            <h5>{activeElection.name}</h5>
                            <h5>From: {activeElection.startDate}</h5>
                            <h5>To: {activeElection.endDate}</h5>
                            <button onClick={() => this.props.history.push('/voting-booth')}>Vote Now!</button>
                          </div>
                        )
                      : <div>"There's no active election in your community!"</div>
                    }
                </p>
              </div>
            </div>
          </Tab>
          <Tab label="Upcoming Elections" >
            <div>
              <h2 style={styles.headline}>Upcoming Elections</h2>
              <p>
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
              </p>
            </div>
          </Tab>
        </Tabs>
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
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {

}
