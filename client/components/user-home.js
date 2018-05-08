import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchActiveElections, fetchUpcomingElections, fetchBlockchainElections } from '../store/user-home';
// import factory from '../../ethereum/factory';

/**
 * COMPONENT
 */
class UserHome extends Component {
  async componentDidMount() {
    this.props.getActiveElections();
    this.props.getUpcomingElections();
    this.props.getBlockchainElections();
    // const campaigns = await factory.methods.getDeployedElections().call();
    // console.log(campaigns);
  }
  render() {
    console.log('state', this.props.state.blockchainElections)
    let active = this.props.activeElections.filter(election => election.communityId === this.props.user.communityId)

    let upcoming = this.props.upcomingElections.filter(election => election.communityId === this.props.user.communityId)

  return (
    <div>
      <h3>Welcome, {this.props.user.name}</h3>
      <hr />
      <h4>Active Election:</h4>
      {
        active.length
        ? active.map(election => {
            return (
              <div key={election.id}>
                <h5>{election.name}</h5>
                <h5>From: {election.startDate}</h5>
                <h5>To: {election.endDate}</h5>
                <button onClick={() => this.props.history.push('/voting-booth')}>Vote Now!</button>
              </div>
            )
          })
        : <div>"There's no active election in your community!"</div>
      }
      <hr />
      <h4>Upcoming Elections:</h4>
      {
        upcoming.length
        ? upcoming.map(election => {
            return (
              <div key={election.id}>
                <h5>{election.name}</h5>
                <h5>From: {election.startDate}</h5>
                <h5>To: {election.endDate}</h5>
              </div>
            )
          })
        : <div>There's no upcoming elections in your community!</div>
      }
      <div>{this.props.state.blockchainElections.map((election, idx) => <div key={idx}>{election}</div>)}</div>
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
    user: state.user,
    activeElections: state.activeElections,
    upcomingElections: state.upcomingElections
  }
}

const mapDispatch = (dispatch) => {
  return {
    getBlockchainElections: () => {
      dispatch(fetchBlockchainElections());
    },
    getActiveElections: () => {
      dispatch(fetchActiveElections());
    },
    getUpcomingElections: () => {
      dispatch(fetchUpcomingElections());
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {

// }
