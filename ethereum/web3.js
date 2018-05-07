import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  //we are in the browser and metamask is running.
  web3 = new Web3(window.web3.currentProvider);
} else {
  //we'll need to set up our own provider
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/OqziZFLnsd0lVspQlLgb'
    //infura is only a portal right now
  );
  web3 = new Web3(provider);
}

export default web3;
