import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { connect } from 'react-redux';

class BarGraph extends Component {

  render (){
    const colors = ['#8884d8', '#8dd1e1', '#9cacf1', '#82ca9d', '#a4de6c', '#d0ed57']
    let idx = 0;

    const data = this.props.candidates ? this.props.candidates.map(candidate => {
      let voteCount = candidate.voteCount;
      let splitName = candidate.name.split(' ')
      let lastName = splitName[1]
      let dataObj = {name: lastName, value: voteCount, fill: colors[idx]}
      idx++
      return dataObj;
    }) : null
    return (
      <BarChart
            className="center"
            width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
            style={{paddingTop: '100px'}}
            >
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="name" />
       <YAxis />
       <Tooltip />
       <Legend />
       <Bar dataKey="value" />
      </BarChart>
    );
  }

}

const mapState = (state) => {
  return {
    candidates: state.activeElection.candidates,
  }
}

export default connect(mapState)(BarGraph);
