import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0xee0B5D81C34833D0e9E59BfB68b216A98E58D2ed'
);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
