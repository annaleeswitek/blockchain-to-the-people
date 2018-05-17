import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchActiveElection, fetchUpcomingElections, fetchBlockchainElections } from '../store/election';
import { RaisedButton } from 'material-ui';
import { blue500 } from 'material-ui/styles/colors'
import moment from 'moment';

// import Election from '../../ethereum/election';

const styles = {
  headline: {
    color: blue500,
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
    console.log('Upcoming: ', this.props.upcomingElections)
    console.log('Active Election: ', this.props.activeElection);
    console.log('Blockchain Addresses: ', this.props.blockchainElections.map((election) => election));
    console.log('Active Candidate', this.props.activeElection.candidates)

    let upcomingElections = this.props.upcomingElections

    return (
      <div className="flex-center">
        <h2 className="header">Current Election</h2>
          <div className="election-box">
              <h2 style={styles.headline}>{activeElection.name}</h2>
                {
                  activeElection
                  ?
                  (
                    <div key={activeElection.id}>
                      <h5>{activeElection.description}</h5>
                      <h5>From: {moment(activeElection.startDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</h5>
                      <h5>To: {moment(activeElection.endDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</h5>
                      <RaisedButton onClick={() => this.props.history.push('/voting-booth')} labelColor="white" primary={true} label="Vote Now!" />
                    </div>
                    )
                  : <div>"There's no active election in your community!"</div>
                }
          </div>
          <br />
            <div className="active-candidates-wrapper">
              {
                activeElection && activeElection.candidates
                ? activeElection.candidates.map(candidate => {
                  return (
                    <div className="candidate-box">
                      <div style={styles.headline}>{candidate.name}</div>
                      <div><img src={candidate.imageURL} /></div>
                      <br />
                      <div>{candidate.description}</div>
                    </div>
                  )
                })
                : <div>There are no candidates in this active election!</div>
                }
            </div>
          <br />
          <br />
          <h2 className="header">Upcoming Elections</h2>
           <div className="election-box"> 
              {
                upcomingElections.length
                ? upcomingElections.map(election => {
                    let startDate = moment(election.startDate).format('dddd, MMMM Do YYYY, h:mm:ss a');
                    let endDate = moment(election.endDate).format('dddd, MMMM Do YYYY, h:mm:ss a');
                    return (
                      <div key={election.id}>
                        <h2 style={styles.headline}>
                        {election.name}</h2>
                        <h5>{election.description}</h5>
                        <h5>From: {startDate}</h5>
                        <h5>To: {endDate}</h5>
                      </div>
                    )
                  })
                : <div>There are no upcoming elections in your community!</div>
              }
            </div>
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
    upcomingElections: state.upcomingElections
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
