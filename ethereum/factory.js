import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0xaf79c97907E8726087279B6e2D051A076cf1B232'
);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
