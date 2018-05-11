import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPastElections } from '../store/election';


class History extends Component {

  componentDidMount() {
    this.props.getHistory(this.props.user.communityId);
  }

  render(){
    const pastElections = this.props.pastElections;
    return (
      <div>
      <h4>Past Elections:</h4>
        {
        pastElections.length
          ? pastElections.map(election => {
            return (
              <div key={election.id}>
                <h5>{election.name}</h5>
                <h5>From: {election.startDate}</h5>
                <h5>To: {election.endDate}</h5>
              </div>
            )
          })
          : <div>There are no past elections in your community!</div>
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
    pastElections: state.elections
  }
}

const mapDispatch = (dispatch) => {
  return {
    getHistory: (userCommunityId) => {
      dispatch(fetchPastElections(userCommunityId));
    }
  }
}

export default connect(mapState, mapDispatch)(History)
