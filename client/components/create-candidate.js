import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RaisedButton, SelectField, TextField, MenuItem, Paper, Snackbar, LinearProgress } from 'material-ui';
import web3 from '../../ethereum/web3';
import Election from '../../ethereum/election';
import { fetchUpcomingElections, postNewCandidate } from '../store/election';

const buttonStyle = {
  margin: 45
 };

const style = {
  height: 570,
  width: 420,
  margin: 15,
  textAlign: 'center',
  display: 'inline-block',
};

class CreateCandidate extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      electionAddress: '',
      imageURL: '',
      affiliation: '',
      message: '',
      description: '',
      isLoading: false,
      open: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleElectionChange = this.handleElectionChange.bind(this);
  }

  async componentDidMount () {
    const userCommunityId = this.props.user.communityId;
    this.props.getUpcomingElections(userCommunityId);
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleElectionChange(event, index, value) {
      let selectedElectionName = this.props.upcomingElections[index].name;
      let address = value;
      this.setState({ electionName: selectedElectionName, electionAddress: address });
  }

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    this.setState({ isLoading: true, open: true});

    const election = await Election(this.state.electionAddress);
    const selectedElection = this.props.upcomingElections.filter(election => election.blockchainAddress == this.state.electionAddress);

    web3.eth.getAccounts()
    .then(accounts => {
      election.methods.createCandidate(this.state.name).send({
        from: accounts[0],
      })
      .then(candidateReceipt => {
        const candidateLog = candidateReceipt.events.CandidateLog.returnValues;
        const newCandidate = {
          name: this.state.name,
          imageURL: this.state.imageURL,
          affiliation: this.state.affiliation,
          voteCount: 0,
          arrayIndex: candidateLog.index,
          description: this.state.description
        }
      this.props.sendNewCandidate(newCandidate, selectedElection[0].id);

        this.setState({
          name: '',
          electionAddress: '',
          imageURL: '',
          affiliation: '',
          message: '',
          description: '',
          open: false,
          isLoading: false
        });
      alert("New Candidate Added!");
      this.props.history.push('/home');
      })
    })
    .catch(console.error)
  };

  render () {
    return (
      <div className="electionForm">
        <Paper style={style} zDepth={2}>
          <br />
          <h1>Add Election Candidate</h1>
          <form onSubmit={this.handleSubmit}>
            <TextField
              floatingLabelText= "candidate name"
              value= {this.state.name}
              name="name"
              onChange= {this.handleChange}
              /><br />
              <TextField
              floatingLabelText="candidate description"
              multiLine={true}
              value={this.state.description}
              name="description"
              onChange={this.handleChange}
              /><br />
              <TextField
              floatingLabelText= "candidate image URL"
              value= {this.state.imageURL}
              name="imageURL"
              onChange= {this.handleChange}
              /><br />
              <TextField
              floatingLabelText= "candidate affiliation"
              value= {this.state.affiliation}
              name="affiliation"
              onChange= {this.handleChange}
              /><br />
              <SelectField
                  value={this.state.electionAddress}
                  name="blockchainAddress"
                  onChange={this.handleElectionChange}
                  floatingLabelText={'election name'}>
                  {this.props.upcomingElections && this.props.upcomingElections.map(function(election) {
                return <MenuItem key = {election.id} value={election.blockchainAddress} primaryText={election.name} />
              })}
            </SelectField><br />
            <RaisedButton type="submit" primary={true} style={buttonStyle} label="SUBMIT" labelColor="white" />
          </form>
            { this.state.isLoading ?
            <div >
            <h4>Adding new candidate to your election...</h4>
            <LinearProgress mode={"indeterminate"} />
            <br />
            <br />
            <br />
            </div>
            : null }
            <Snackbar
                open={this.state.open}
                message="Click 'submit' in MetaMask to add your candidate to the election! It'll take a minute!"
                autoHideDuration={10000}
                onRequestClose={this.handleRequestClose}
              />
        </Paper>
      </div>

  )
  }
}
const mapState = (state) => {
  return {
    state: state,
    user: state.user,
    communityId: state.user.communityId,
    // activeElection: state.activeElection,
    upcomingElections: state.upcomingElections
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUpcomingElections: (userCommunityId) => {
        dispatch(fetchUpcomingElections(userCommunityId));
    },
    sendNewCandidate: (newCandidateObj, electionId) => {
      dispatch(postNewCandidate(newCandidateObj, electionId))
    }
  }
}

export default connect(mapState, mapDispatch)(CreateCandidate);
