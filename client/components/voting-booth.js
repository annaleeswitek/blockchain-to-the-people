import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchActiveElection, postVote } from '../store/election';
import web3 from '../../ethereum/web3';
import { LinearProgress, Snackbar, Dialog } from 'material-ui';
import Election from '../../ethereum/election';
import socket from '../socket';
//export const newVoteSocket

class VotingBooth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      candidateName: '',
      message: '',
      arrayIndex: '',
      candidateId: '',
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
  };


  handleSubmit = async (evt) => {
    evt.preventDefault();

    const selectedCandidate = this.props.candidates.find(candidate => candidate.arrayIndex == this.selectedCandidateArrayIndex);

    web3.eth.getAccounts()
    .then(accounts => {
      this.setState({ isLoading: true, open: true});
      this.election.methods.submitVote(1234, this.state.arrayIndex).send({
        from: accounts[0],
        //equivalent to udemy would be --> value: this.state.arrayIndex
      })
      .then(voteReceipt => {
        console.log('VOTING BOOTH voteReciept', voteReceipt);
        const candidateLog = voteReceipt.events.CandidateLog.returnValues;
        this.props.sendNewVote({count: candidateLog.count, index: candidateLog.index, name: candidateLog.name}, selectedCandidate.id);
        socket.emit('newVote', {count: candidateLog.count, index: candidateLog.index, name: candidateLog.name});
        this.setState({ isLoading: false, open: false });
      })
    })
    .catch(console.error)
  };

  render() {
    let activeElection = this.props.activeElection;
    return (
      <div>
        {
          activeElection
          ?
          <div>
            <h1>{activeElection.name}</h1>
            <h4>Voting period ends by {activeElection.endDate}</h4>
            <h5>Cast your vote HERE!</h5>
            <form onSubmit={this.handleSubmit}>
            {
              this.props.candidates
              ? this.props.candidates.map(candidate => {
                // this.state.candidates.push({ candidateName: candidate.name, candidateId: candidate.id, arrayIndex: candidate.arrayIndex })
                return (
                  <div key={candidate.id}>
                    <img src={candidate.imageURL} />
                    <h3>{candidate.name}</h3>
                    <h4>{candidate.affiliation}</h4>
                    <input type="checkbox" onChange={this.handleChange} name="arrayIndex" value={candidate.arrayIndex} />
                  </div>
                )
              })
              : null
            }
            <button type="submit" onClick={this.handleClick} label = "submit vote">Submit Vote</button>
            <div>{this.state.message}</div>
            </form>

            { this.state.isLoading ?
            <div >
            <LinearProgress mode={"indeterminate"}/>
            </div>

            : null }
            <Snackbar
                open={this.state.open}
                message="Click 'submit' in MetaMask to add your vote to the blockchain! It'll take a minute!"
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
