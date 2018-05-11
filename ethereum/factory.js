import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0x9016ed32Ec5823dcFc64BEE01443c53Ed0dD1789'
);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
