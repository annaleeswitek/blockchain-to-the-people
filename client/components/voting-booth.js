import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchActiveElection, postVote } from '../store/election';
import web3 from '../../ethereum/web3';
import { LinearProgress, Snackbar, Dialog, Paper, RaisedButton, TextField } from 'material-ui';
import Election from '../../ethereum/election';
import Checkbox from 'material-ui/Checkbox'
import socket from '../socket';
import moment from 'moment';
//export const newVoteSocket

const style = {
  margin: 15,
  checkbox: {
    marginBottom: 16,
    width: 15
  },
}

class VotingBooth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      candidateName: '',
      message: '',
      arrayIndex: '',
      candidateId: '',
      code: '',
      isLoading: false,
      open: false
    }
    this.election = null;
    this.selectedCandidateArrayIndex = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    this.props.getActiveElection(this.props.user.communityId);
    this.election = await Election(this.props.blockchainAddress);
    console.log('election came back', this.election);

    const newVoteEvent = await this.election.events.CandidateLog();
    window.election = this.election
    window.nve = newVoteEvent
    newVoteEvent.on('data', (error, result) => {
      if (error) console.log('error here', error);
      console.log("hey! newVoteEvent was triggered! Yay ", result);
    });
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

  handleChange(evt) {
    this.selectedCandidateArrayIndex = evt.target.value;
    console.log("HERE is EVT target val", evt.target.value)
    this.setState({[evt.target.name]: evt.target.value});
  }


  handleSubmit = async (evt) => {
    evt.preventDefault();
    //equal in find needs to be double, not triple, equal
    const selectedCandidate = this.props.candidates.find(candidate => candidate.arrayIndex == this.selectedCandidateArrayIndex);

    web3.eth.getAccounts()
    .then(accounts => {
      this.setState({ isLoading: true, open: true});
      this.election.methods.submitVote(this.state.code, this.state.arrayIndex).send({
        from: accounts[0],
        //equivalent to udemy would be --> value: this.state.arrayIndex
      })
      .then(voteReceipt => {
        console.log('VOTING BOOTH voteReciept', voteReceipt);
        alert('Congratulations! You vote has been cast!');
        const candidateLog = voteReceipt.events.CandidateLog.returnValues;
        this.props.sendNewVote({count: candidateLog.count, index: candidateLog.index, name: candidateLog.name}, selectedCandidate.id);
        socket.emit('newVote', {count: candidateLog.count, index: candidateLog.index, name: candidateLog.name});
        this.setState({ isLoading: false, open: false });
        this.props.history.push('/watch');
      })
    })
    .catch(console.error)
  };

  render() {
    let activeElection = this.props.activeElection;
    return (
      <div className="flex-center">
        {
          activeElection
          ?
          <div className="center-text">
            <h1>{activeElection.name}</h1>
            <h4>The voting period ends at {moment(activeElection.endDate).format('dddd, MMMM Do YYYY, h:mm a')}</h4>
            <h3>Please cast your vote here.</h3>
            <TextField
                floatingLabelText="election code"
                errorText="This field is required"
                value={this.state.code}
                name="code"
                onChange={this.handleChange}
            /><br />
            <form className="ballot" onSubmit={this.handleSubmit}>
            <div className="ballot-wrapper">
            {
              this.props.candidates
              ? this.props.candidates.map(candidate => {
                return (
                  <div className="ballot-box" key={candidate.id}>
                    <img src={candidate.imageURL} className="flexBallot" />
                    <h2>{candidate.name}</h2>
                    <h4>{candidate.affiliation}</h4>
                    <Checkbox
                    onCheck={this.handleChange}
                    value={candidate.arrayIndex}
                    className="flexBallot"
                    style={style.checkbox}
                    />
                  </div>
                )
              })
              : null
            }
            </div>
            <RaisedButton type="submit" onClick={this.handleClick} label = "SUBMIT VOTE" primary={true} />
            <div>{this.state.message}</div>
            </form>
              <br />
              <br />
              { this.state.isLoading ?
              <div >
              <h4>Processing your vote on the blockchain</h4>
              <LinearProgress mode={'indeterminate'} />
              </div>
              : null }
            <Snackbar
                open={this.state.open}
                message="Click 'submit' in MetaMask to add your vote to the blockchain!"
                autoHideDuration={10000}
                onRequestClose={this.handleRequestClose}
              />
          </div>
          : <div>There's no election active at this time!</div>
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    blockchainActiveElection: state.blockchainActiveElection,
    user: state.user,
    communityId: state.user.communityId,
    activeElection: state.activeElection,
    candidates: state.activeElection.candidates,
    blockchainAddress: state.activeElection.blockchainAddress
  }
};

const mapDispatch = (dispatch) => {
  return {
    getActiveElection: (userCommunityId) => {
      dispatch(fetchActiveElection(userCommunityId))
    },
    sendNewVote: (candidateLog, arrayIndex) => {
      dispatch(postVote(candidateLog, arrayIndex))
    }
  }
};

export default connect(mapState, mapDispatch)(VotingBooth);

// { this.state.isLoading ?
//   <Dialog
//     title="Transaction Pending"
//     open={this.state.open}
//   >
//   <CircularProgress size={30} thickness={5}/>
//   <h1>Your vote is being added to the blockchain.</h1>
//   </Dialog>

//   : null }
