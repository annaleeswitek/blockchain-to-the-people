import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RaisedButton, TextField, DatePicker, TimePicker } from 'material-ui';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { postNewElection } from '../store/election';
import moment from 'moment';

class CreateElection extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      code: '',
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      description: ''
    }
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    // this.createdElectionEvt = null;
  }

  async componentDidMount () {
    const createdElectionEvt = await factory.events.ElectionLog({});
    createdElectionEvt.on((error, result) => {
      if(error) console.log('error here ', error);
    });
  }

  // componentWillUnmount () {
  //   this.createdElectionEvt.stopWatching();
  // }

  handleName(event) {
    // this.setState({ [event.target.name]: event.target.value });
    this.setState({name: event.target.value});
  }

  handleDescription(event) {
    this.setState({description: event.target.value})
  }

  handleCodeChange(event) {
      this.setState({ code: event.target.value })
  }

  handleStartDate (event, date) {
    let currentState = this.state;
    currentState.startDate = date;
    this.setState(currentState);
  }

  handleEndDate (event, date) {
    let currentState = this.state;
    currentState.endDate = date;
    this.setState(currentState);
  }

  handleStartTime (event, time) {
    let currentState = this.state;
    currentState.startTime = time;
    this.setState(currentState);
  }

  handleEndTime (event, time) {
    let currentState = this.state;
    currentState.endTime = time;
    this.setState(currentState);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let momentStartTime = moment(this.state.startTime);
    let momentEndTime = moment(this.state.endTime);
    let momentStartDate = moment(this.state.startDate);
    let momentEndDate = moment(this.state.endDate);

    let renderedStartDateTime = moment({
      year: momentStartDate.year(),
      month: momentStartDate.month(),
      day: momentStartDate.date(),
      hour: momentStartTime.hours(),
      minute: momentStartTime.minutes()
    });

    let renderedEndDateTime = moment({
      year: momentEndDate.year(),
      month: momentEndDate.month(),
      day: momentEndDate.date(),
      hour: momentEndTime.hours(),
      minute: momentEndTime.minutes()
    });

    web3.eth.getAccounts()
      .then(accounts => {
        return factory.methods
        .createElection(this.state.code)
        .send({
          from: accounts[0]
        })
        .then(newElectionAddress => {
          const address = newElectionAddress.events.ElectionLog.returnValues.election;
          const objToSend = {
            name: this.state.name,
            description: this.state.description,
            startDate: renderedStartDateTime._d,
            endDate: renderedEndDateTime._d,
            blockchainAddress: address,
            foreignId: this.props.communityId
          }
          this.props.postNewElection(objToSend ,this.props.communityId)
          this.setState({ name: '', code: '', startDate: null, endDate: null, startTime: null, endTime: null });
          alert("New Election Added!");
          this.props.history.push('/home');
        })
      })
      .catch(console.error)
  };

  render () {
    return (
      <div>
        <h1>New Election</h1>
          <form onSubmit={this.handleSubmit}>
            <TextField
              floatingLabelText="name"
              value={this.state.name}
              onChange={this.handleName}
            /><br />
            <TextField
            floatingLabelText="election description"
            multiLine={true}
            value={this.state.description}
            name="description"
            onChange={this.handleDescription}
            /><br />
            <DatePicker hintText="start date" value={this.state.startDate} onChange={this.handleStartDate}  />
            <DatePicker hintText="end date" value={this.state.endDate} onChange={this.handleEndDate} />
            <TimePicker hintText="start time" value={this.state.startTime} onChange={this.handleStartTime} />
            <TimePicker hintText="end time" value={this.state.endTime} onChange={this.handleEndTime} />
            <TextField
              floatingLabelText="code"
              value={this.state.code}
              onChange={this.handleCodeChange}
            /><br />
            <RaisedButton type="submit">Submit</RaisedButton>
          </form>
      </div>
  )
  }
}
const mapState = (state) => {
  return {
    state: state,
    communityId: state.user.communityId,
    activeElection: state.activeElection,
    upcomingElections: state.upcomingElections
  }
}

const mapDispatch = (dispatch) => {
  return {
    postNewElection: (obj, communityId) => {
      dispatch(postNewElection(obj, communityId));
    }
  }
}

export default connect(mapState, mapDispatch)(CreateElection);
