import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchActiveElections } from '../store/user-home';


class VotingBooth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      candidate: ''
    }
  }

  componentDidMount() {
    this.props.getActiveElections();
  }

  render() {
    console.log('Props!', this.props)
    let active = this.props.activeElections.filter(election => election.communityId === this.props.user.communityId)[0]
    console.log('ELECTION', active)

    return (
      <div>
        {
          active
          ?
          <div>
            <h1>{active.name}</h1>
            <h4>Voting period ends by {active.endDate}</h4>
            <h5>Cast your vote HERE!</h5>
            <form>
            {
              active.candidates.map(candidate => {
                return (
                  <label key={candidate.id}>
                  <img src={candidate.imageURL} />
                  <h3>{candidate.name}</h3>
                  <h4>{candidate.affiliation}</h4>
                  <input type="checkbox" value={this.state.candidate} />
                  </label>
                )
              })
            }
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
