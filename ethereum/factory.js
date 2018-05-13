import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0x3F75BB69778a548318c27a7D9FFC7aE9589388DC'
);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
