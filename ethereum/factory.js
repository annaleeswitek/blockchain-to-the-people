import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0x827a839c0E86cC417Ed50B82629Bd82BD759e258'

);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
