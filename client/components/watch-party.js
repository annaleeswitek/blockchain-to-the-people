import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidates } from '../store/watch-party';
// import Election from '../../ethereum/election';
import DonutChart from './donut-chart';
import BarGraph from './bar-chart';
import { RaisedButton } from 'material-ui';

/**
 * COMPONENT
 */

class WatchParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchView: false,
      GraphName: false,
      data: [ {name: 'Group A', value: 400, fill: '#8884d8'},
              {name: 'Group B', value: 300, fill: '#9cacf1'},
              {name: 'Group C', value: 300, fill: '#8dd1e1'},
              {name: 'Group D', value: 200, fill: '#82ca9d'},
              {name: 'Group E', value: 278, fill: '#a4de6c'},
              {name: 'Group F', value: 189, fill: '#d0ed57'}
            ]
    }
  }

  // async componentDidMount () {
  //   const election = await Election('0xC14AD6de02704C2e805e0b383116FC0B373eFF3b');
  //   // const count = await election.methods.candidates(3).call();
  //   // console.log(count);
  //   // console.log(election);
  //   // election
  //   // .then(this.props.getCandidates(election));
  //   this.props.getCandidates(election);
  // }

  render () {
    // console.log('CANDIDATES! ', this.props.candidates[0] && this.props.candidates[0].name)
    let active = this.props.activeElections.filter(election => election.communityId === this.props.user.communityId)

    return (
      <div>
          {
            active.length
            ? active.map(election => {
              return (
                <div key={election.id}>
                  <h1>Welcome to the Watch Party for the {election.name}!</h1>
                  {/*<DonutChart />*/}
                  <hr />
                  <div>{this.props.candidates[0] && `${this.props.candidates[0].name} ${this.props.candidates[0].count}`}</div>
                  <div>{this.props.candidates[1] && `${this.props.candidates[1].name} ${this.props.candidates[1].count}`}</div>
                </div>
              )
            })
            : <div>"There's no active election in your community!"</div>
          }
          {
            this.state.GraphName
            ? <RaisedButton  primary={true} label="Switch to Pie Chart" onClick={() => this.setState({switchView: !this.state.switchView, GraphName: !this.state.GraphName})} />
            : <RaisedButton  primary={true} label="Switch to Bar Graph" onClick={() => this.setState({switchView: !this.state.switchView, GraphName: !this.state.GraphName})} />
          }          
          {
            this.state.switchView
            ? <BarGraph data={this.state.data} />
            : <DonutChart data={this.state.data} />
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
    activeElections: state.activeElections,
    candidates: state.candidates
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCandidates: (election) => {
      dispatch(fetchCandidates(election));
    }
  }
}

export default connect(mapState, mapDispatch)(WatchParty);
