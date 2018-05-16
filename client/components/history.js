import React, { Component } from 'react'
import { connect } from 'react-redux';
import PastDonutChart from './past-donut-chart';
import { fetchPastElections } from '../store/election';
import moment from 'moment';


class ElectionHistory extends Component {

  componentDidMount() {
    this.props.getHistory(this.props.user.communityId);
  }

  render(){
    const pastElections = this.props.pastElections;
    return (
      <div className="history-wrapper">
      <h1>Past Elections</h1>
        {
        pastElections.length
          ? pastElections.map(election => {
            let startDate = moment(election.startDate).format('dddd, MMMM Do YYYY, h:mm a');
            let endDate = moment(election.endDate).format('dddd, MMMM Do YYYY, h:mm a');
            return (
              <div key={election.id}>
                <div className= "past-election-box">
                  <div className="past-election-info">
                    <h2>{election.name}</h2>
                    <br />
                    <h3>Started: {startDate}</h3>
                    <br />
                    <h3>Ended: {endDate}</h3>
                  </div>
                  <PastDonutChart idx={election.id} />
                </div>
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
    pastElections: state.pastElections
  }
}

const mapDispatch = (dispatch) => {
  return {
    getHistory: (userCommunityId) => {
      dispatch(fetchPastElections(userCommunityId));
    }
  }
}

export default connect(mapState, mapDispatch)(ElectionHistory)
