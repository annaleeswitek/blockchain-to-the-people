import Web3 from 'web3';
//will handle the case in which a user doesn't have metamask soon.
const web3 = new Web3(window.web3.currentProvider);

export default web3;
