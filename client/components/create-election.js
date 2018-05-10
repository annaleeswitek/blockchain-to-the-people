import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RaisedButton, TextField, DatePicker, TimePicker } from 'material-ui';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { fetchActiveElections } from '../store/user-home';
import moment from 'moment';

// import web3 from './web3';
// import ElectionFactory from '../../ethereum/build/ElectionFactory.json';

// const contractInstance = web3.eth.contract( ElectionFactory.interface)
// const receiptAddress = contractInstance.at('0x2c681fADC9ff8A7490e8c63D3F2E2509aEDC7CC8');

// const electionEvent = factory.ElectionLog();
// electionEvent.watch((error, result) => console.log(error, result));

class CreateElection extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      code: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    // this.createdElectionEvt = null;
  }

  async componentDidMount () {
    const createdElectionEvt = await factory.events.ElectionLog({});
    // console.log('hey! electionEvt! ', createdElectionEvt)
    createdElectionEvt.on((error, result) => {
      if(error) console.log('error here ', error);
      // console.log("RESULT! ", result);
    });
  }

  // componentWillUnmount () {
  //   this.createdElectionEvt.stopWatching();
  // }

  handleChange (event) {
    // this.setState({ [event.target.name]: event.target.value })
    this.setState({ name: event.target.value })
  }


  handleCodeChange(event) {
      this.setState({ code: event.target.value })
  }

  handleStartDate (event, date) {
    let currentState = this.state;
    currentState.startDate = date;
    this.setState(currentState);
    console.log(this.state)
  }

  handleEndDate (event, date) {
    let currentState = this.state;
    currentState.endDate = date;
    this.setState(currentState);
    console.log(this.state)
  }

  handleStartTime (event, time) {
    let currentState = this.state;
    currentState.startTime = time;
    this.setState(currentState);
    console.log(this.state)
  }

  handleEndTime (event, time) {
    let currentState = this.state;
    currentState.endTime = time;
    this.setState(currentState);
    console.log(this.state)
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let momentStartTime = moment(this.state.startTime);
    let momentEndTime = moment(this.state.endTime);
    let momentStartDate = moment(this.state.startDate);
    let momentEndDate = moment(this.state.endDate);

    let renderedStartDateTime = moment({
      year: momentStartDate.year(),
      month: momentStartDate.month(),
      day: momentStartDate.day(),
      hour: momentStartTime.hours(),
      minute: momentStartTime.minutes()
    })

    let renderedEndDateTime = moment({
      year: momentEndDate.year(),
      month: momentEndDate.month(),
      day: momentEndDate.day(),
      hour: momentEndTime.hours(),
      minute: momentEndTime.minutes()
    })

    // web3.eth.getAccounts()
    //   .then(accounts => {
    //     return factory.methods
    //     .createElection(this.state.code)
    //     .send({
    //       from: accounts[0]
    //     })
    //     .then(stuff => console.log(stuff.events.ElectionLog.returnValues.election))
    //   })
      // .catch(console.error)
  };

  render () {
    return (
      <div>
        <h1>New Election</h1>
          <form onSubmit={this.handleSubmit}>
            <TextField
              floatingLabelText="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <DatePicker name="start date" hintText="start date" value={this.state.startDate} onChange={this.handleStartDate}  />
            <DatePicker hintText="end date" value={this.state.endDate}  onChange={this.handleEndDate} />
            <TimePicker hintText="start time" value={this.state.startTime}  onChange={this.handleStartTime} />
            <TimePicker hintText="end time" value={this.state.endTime} onChange={this.handleEndTime} />
            <TextField
              floatingLabelText="code"
              value={this.state.code}
              onChange={this.handleCodeChange}
            />
          <RaisedButton type="submit">Submit</RaisedButton>
          </form>
      </div>
  )
  }
}
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
    getActiveElections: () => {
      dispatch(fetchActiveElections());
    }
  }
}

export default connect(mapState, mapDispatch)(CreateElection);
