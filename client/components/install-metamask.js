import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCommunityMembers, postMemberEmail } from '../store/community';
import { List, TextField, RaisedButton, FlatButton} from 'material-ui';
import { Link } from 'react-router-dom';
import moment from 'moment';


/**
 * COMPONENT
 */

class installMetamask extends Component {
  render() {

    return (
      <div>
          <br /> 
       <a href ="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"><RaisedButton backgroundColor="87ceeb" label="Install MetaMask"/></a> 
           <br /> 
    </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    communityMembers: state.communityMembers,
    user: state.user,
  }
};

const mapDispatch = (dispatch) => {
  return {
    getCommunityMembers: (communityId) => {
      dispatch(fetchCommunityMembers(communityId))
    },
    sendMemberEmail: (sendObj) => {
      dispatch(postMemberEmail(sendObj));
    }
  }
};

export default connect(mapState, mapDispatch)(installMetamask);
