import React, { Component } from 'react'
import { connect } from 'react-redux';
import PastDonutChart from './past-donut-chart';
import DonutChart from './donut-chart';
import { fetchPastElections } from '../store/election';


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
            return (
              <div key={election.id}>
                <div className="center-text election-box">

                <h2>{election.name}</h2>
                <h5>From: {election.startDate}</h5>
                <h5>To: {election.endDate}</h5>
                <PastDonutChart idx={election.id} />
              </div>
                {/* <h5>Candidates: {election.candidates.map(candidate => {
                      return (<ul key={candidate.id}>
                        {`${candidate.name} (${candidate.affiliation})`}
                        </ul>
                      )
                  })} </h5> */}
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
