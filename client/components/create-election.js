import React, { Component } from 'react'
import { RaisedButton, TextField, DatePicker, TimePicker } from 'material-ui';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';

export default class CreateElection extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
  }

  handleChange (event) {
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
    console.log('Submitted')
    web3.eth.getAccounts()
      .then(accounts => {
        factory.methods
        .createElection(this.state.code)
        .send({
          from: accounts[0]
        })
      });
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
            <DatePicker hintText="start date" value={this.state.startDate} onChange={this.handleStartDate}  />
            <DatePicker hintText="end date" value={this.state.endDate}  onChange={this.handleEndDate} />
            <TimePicker hintText="start time" value={this.state.startTime}  onChange={this.handleStartTime} />
            <TimePicker hintText="end time" value={this.state.endTime} onChange={this.handleEndTime} />
            <TextField
              floatingLabelText="code"
              value={this.state.code}
              onChange={this.handleCodeChange}
            />
            <br />
          <RaisedButton type="submit">Submit</RaisedButton>
          </form>
      </div>
  )
  }
}
