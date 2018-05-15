import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
<<<<<<< HEAD
  '0xee0B5D81C34833D0e9E59BfB68b216A98E58D2ed'
=======
  '0x6Bef635dbb8966d7a92bBE6eA2B3b2cDD15740CA'

>>>>>>> 0e04675c18750a3d425f65a6c986e70f1d12aae2
);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
