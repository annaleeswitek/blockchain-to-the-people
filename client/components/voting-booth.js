import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchActiveElection } from '../store/election';
import web3 from '../../ethereum/web3';
import Election from '../../ethereum/election';

class VotingBooth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      candidateName: '',
      message: '',
      arrayIndex: ''
    }
    this.election = null
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    this.election = await Election(this.props.blockchainAddress);
    console.log('election came back', this.election)
    const userCommunityId = this.props.user.communityId;
    this.props.getActiveElection(userCommunityId);
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();

    web3.eth.getAccounts()
    .then(accounts => {
      this.election.methods.submitVote(1234, this.state.arrayIndex).send({
        from: accounts[0],
        //equivalent to udemy would be --> value: this.state.arrayIndex
      })
      .then(voteReceipt => console.log(voteReceipt))
      //instead of just console.logging the voteReceipt, will want to hook up a listener that will
      //end the wait spinner or whatever we have and give a message to the user that their vote was successful
    })
    .catch(console.error)
  }

  render() {
    console.log('this.props', this.props)
    let activeElection = this.props.activeElection;
    console.log('candidates', this.props.candidates)
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
                return (
                  <div key={candidate.id}>
                    <img src={candidate.imageURL} />
                    <h3>{candidate.name}</h3>
                    <h4>{candidate.affiliation}</h4>
                    <input type="checkbox" onChange={this.handleChange} name ="arrayIndex" value={candidate.arrayIndex} />
                  </div>
                )

              })
              : null
            }
            <button type="submit">Submit Vote</button>
            <div>{this.state.message}</div>
            </form>
          </div>
          : <div>There's no election active at this time!</div>
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    communityId: state.user.communityId,
    activeElection: state.activeElection,
    candidates: state.activeElection.candidates,
    blockchainAddress: state.activeElection.blockchainAddress
  }
}

const mapDispatch = (dispatch) => {
  return {
    getActiveElection: (userCommunityId) => {
      dispatch(fetchActiveElection(userCommunityId))
    }
  }
}

export default connect(mapState, mapDispatch)(VotingBooth)
