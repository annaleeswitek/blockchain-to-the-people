
import React, { Component } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { connect } from 'react-redux';


class PastDonutChart extends Component {

  render (){
    const colorArray = ['#8884d8', '#9cacf1', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57']
    let idx = 0;

    const data = this.props.pastElections.candidates.length ? this.props.pastElections.candidates.map(candidate => {
      let candidateName = candidate.name;
      let candidateVoteCount = candidate.voteCount;
      let dataObj = {name: candidateName, value: candidateVoteCount, fill: colorArray[idx]}
      idx++
      return dataObj;
    }) : null
    return (
      <PieChart width={350} height={350}>
        <Pie isAnimationActive={true} data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={90} outerRadius={110} fill="#82ca9d" label />
        <Tooltip />
      </PieChart>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    candidates: state.activeElection.candidates,
    pastElections: state.pastElections.find(election => {
        return election.id === +ownProps.idx
    })
  }
}

const mapDispatch = (dispatch) => {
    return {
      getHistory: (userCommunityId) => {
        dispatch(fetchPastElections(userCommunityId));
      }
    }
  }

export default connect(mapState, mapDispatch)(PastDonutChart);
