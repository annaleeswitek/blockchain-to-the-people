import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0x692Cb8a0C3DA89A87aafa1Ea72B395BD8b94037a'
);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
