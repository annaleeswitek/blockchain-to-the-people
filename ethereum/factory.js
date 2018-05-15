import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),

  '0x6Bef635dbb8966d7a92bBE6eA2B3b2cDD15740CA'
);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
