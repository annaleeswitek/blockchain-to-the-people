import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCandidates } from '../store/watch-party';
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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const election = await Election('0xC14AD6de02704C2e805e0b383116FC0B373eFF3b');
    const userCommunityId = this.props.user.communityId;
    this.props.getCandidates(election);
    this.props.getActiveElection(userCommunityId);
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    let active = this.props.activeElection;

    const election = await Election(active.blockchainAddress)

    web3.eth.getAccounts()
    .then(accounts => {
      election.methods.submitVote(5463, this.state.arrayIndex).send({
        from: accounts[0],
        //equivalent to udemy would be --> value: this.state.arrayIndex
      })
    })
    .catch(console.error)
  }

  render() {
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
              this.props.activeElectionCandidates
              ? this.props.activeElectionCandidates.map(candidate => {
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
    activeElectionCandidates: state.activeElection.candidates
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCandidates: (election) => {
      dispatch(fetchCandidates(election));
    },
    getActiveElection: (userCommunityId) => {
      dispatch(fetchActiveElection(userCommunityId))
    }
  }
}

export default connect(mapState, mapDispatch)(VotingBooth)
