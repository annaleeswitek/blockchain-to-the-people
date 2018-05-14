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
      <div>
      <h4>Past Elections:</h4>
        {
        pastElections.length
          ? pastElections.map(election => {
            return (
                <div key={election.id}>

                <h5>{election.name}</h5>
                <h5>Candidates: {election.candidates.map(candidate => {
                    return (<li> 
                       {`${candidate.name} (${candidate.affiliation})`}
                       </li> 
                    )
                })} </h5> 
                <h5>From: {election.startDate}</h5>
                <h5>To: {election.endDate}</h5>
                <PastDonutChart idx={election.id}/>
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

export default connect(mapState, mapDispatch)(ElectionHistory)
