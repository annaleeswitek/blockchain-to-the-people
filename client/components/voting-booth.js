import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchActiveElections } from '../store/user-home';
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

  componentDidMount() {
    this.props.getActiveElections();
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    let active = this.props.activeElections.filter(election => election.communityId === this.props.user.communityId)[0]
    console.log('active!', active.blockchainAddress)

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
    // console.log('Props!', this.props)
    let active = this.props.activeElections.filter(election => election.communityId === this.props.user.communityId)[0]
    console.log('ELECTION', active)
    // console.log('STATE', this.state)

    return (
      <div>
        {
          active
          ?
          <div>
            <h1>{active.name}</h1>
            <h4>Voting period ends by {active.endDate}</h4>
            <h5>Cast your vote HERE!</h5>
            <form onSubmit={this.handleSubmit}>
            {
              active.candidates.map(candidate => {
                return (
                  <div key={candidate.id}>
                    <img src={candidate.imageURL} />
                    <h3>{candidate.name}</h3>
                    <h4>{candidate.affiliation}</h4>
                    <input type="checkbox" onChange={this.handleChange} name ="arrayIndex" value={candidate.arrayIndex}/>
                  </div>
                )
              })
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
    activeElections: state.activeElections
  }
}

const mapDispatch = (dispatch) => {
  return {
    getActiveElections: () => {
      dispatch(fetchActiveElections)
    }
  }
}

export default connect(mapState, mapDispatch)(VotingBooth)
