import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RaisedButton, SelectField, TextField, MenuItem } from 'material-ui';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { fetchUpcomingElections } from '../store/election';

class CreateCandidate extends Component {
  constructor(){
    super();
    this.state = {
      name: '', 
      electionName: '', 
      blockchainAddress: '', 
      imageURL: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleElectionChange = this.handleElectionChange.bind(this); 
  }

  async componentDidMount () {
    const userCommunityId = this.props.user.communityId;
    this.props.getUpcomingElections(userCommunityId);
  }

  // componentWillUnmount () {
  //   this.createdElectionEvt.stopWatching();
  // }

  handleElectionChange(event, index, value) {
      let selectedElectionName = this.props.upcomingElections[index].name; 
      let address = value; 
      this.setState({ electionName: selectedElectionName, blockchainAddress: address })
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  // handleName (event) {
  //   this.setState({name: event.target.value})
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("STATE BEFORE POST IS", this.state);

    // web3.eth.getAccounts()
    // .then(accounts => {
        //do we need an additional event on the contract for this one? it seems like we could just pull 
        //this one from what's in our state here + db 
    //   this.election.methods.createCandidate(this.state.name).send({
    //     from: accounts[0],
    //   })
    //   .then(createdCandidateReceipt => {
    //     const newCandidate = {
    //       name: this.state.name, 
    //       imageURL: this.state.imageURL, 
    //       affiliation: this.state.affiliation, 
    //       arrayIndex: this.state.arrayIndex, 
    //       voteCount: 0, 
    //        electionId: election ID that corresponds w/ selected blockchain address}
        //post to db w/ candidate name and blockchain name        
    //     this.props.sendCandidateLog({count: candidateLog.count, index: candidateLog.index, name: candidateLog.name});
    //   })
    // })
    // .catch(console.error)
  };

  render () {
    return (
      <div>
        <h1>Add Election Candidate</h1>
          <form onSubmit={this.handleSubmit}>
           <TextField 
            floatingLabelText= "candidate name"
            value= {this.state.name}
            onChange= {this.handleChange} 
            /><br /> 
            <TextField 
            floatingLabelText= "candidate image URL"
            value= {this.state.imageURL}
            onChange= {this.handleChange} 
            /><br /> 
            <SelectField
                value={this.state.blockchainAddress}
                onChange={this.handleElectionChange} 
                floatingLabelText={"election name"}>
                 {this.props.upcomingElections && this.props.upcomingElections.map(function(election) {
              return <MenuItem key = {election.id} value={election.blockchainAddress} primaryText={election.name}/>
            })}
           </SelectField><br />
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
    communityId: state.user.communityId,
    activeElection: state.activeElection,
    upcomingElections: state.elections
  }
}

const mapDispatch = (dispatch) => {
  return {
    postNewElection: (obj, communityId) => {
      dispatch(postNewElection(obj, communityId));
    }, 
    getUpcomingElections: (userCommunityId) => {
        dispatch(fetchUpcomingElections(userCommunityId)); 
    }
  }
}

export default connect(mapState, mapDispatch)(CreateCandidate);