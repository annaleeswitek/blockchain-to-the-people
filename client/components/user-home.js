import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchActiveElection, fetchUpcomingElections, fetchBlockchainElections } from '../store/election';
<<<<<<< HEAD
import { Paper, Tab, Tabs, RaisedButton, GridList, GridTile} from 'material-ui';
=======
import { Tab, Tabs, RaisedButton, Paper } from 'material-ui';
>>>>>>> master
import moment from 'moment';
// import Election from '../../ethereum/election';

const gridStyles = {
  root: {
    paddingTop: 16,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    height: 650,
    width: 1275,
    overflowY: 'auto',
  }
};

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const style = {
  height: 400,
  width: 680,
  margin: 15,
  textAlign: 'center',
  display: 'inline-block',
};
/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {
    const userCommunityId = this.props.user.communityId;
    this.props.getActiveElection(userCommunityId)
    this.props.getUpcomingElections(userCommunityId);
    this.props.getBlockchainElections();
  }
  render() {
    let activeElection = this.props.activeElection
    console.log('Upcoming ', this.props.upcomingElections)
    console.log("blockchain addresses, ", this.props.blockchainElections.map((election, idx) => election));
    let upcomingElections = this.props.upcomingElections

    return (
      <div className="center">
        <h3>Welcome, {this.props.user.name}!</h3>
        <Tabs>
          <Tab label="Active Election">
          <Paper style={style} zDepth={2}>
            <div className="center">
              <div>
                <h2 style={styles.headline}>{activeElection.name}</h2>
                    {
                      activeElection
                      ?
                      (
                          <div key={activeElection.id}>
                            <h5>{activeElection.name}</h5>
                            <h5>From: {moment(activeElection.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</h5>
                            <h5>To: {moment(activeElection.endDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</h5>
                            <RaisedButton onClick={() => this.props.history.push('/voting-booth')} labelColor="white" primary={true} label="Vote Now!" />
                          </div>
                        )
                      : <div>"There's no active election in your community!"</div>
                    }
              </div>
            </div>
            </Paper>
          </Tab>
          <Tab label="Upcoming Elections">
          <div style={gridStyles.root}>
          <GridList
            cellHeight='auto'
            style={gridStyles.gridList}
            cols={1}
            >
              {
                upcomingElections.length
                ? upcomingElections.map(election => {
                    let startDate = moment(election.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
                    let endDate = moment(election.endDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
                    return (
                      <GridTile
                      key={election.id}
                      >
                        <h5>{election.name}</h5>
                        <h5>From: {startDate}</h5>
                        <h5>To: {endDate}</h5>
                      </GridTile>
                    )
                  })
                : <div>There are no upcoming elections in your community!</div>
              }
            </GridList>
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    blockchainElections: state.blockchainElections,
    user: state.user,
    activeElection: state.activeElection,
    upcomingElections: state.upcomingElections
  }
}

const mapDispatch = (dispatch) => {
  return {
    getBlockchainElections: () => {
      dispatch(fetchBlockchainElections());
    },
    getActiveElection: (userCommunityId) => {
      dispatch(fetchActiveElection(userCommunityId));
    },
    getUpcomingElections: (userCommunityId) => {
      dispatch(fetchUpcomingElections(userCommunityId));
    },
  }
}

export default connect(mapState, mapDispatch)(UserHome)
