import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0x5C0fE8E63eC8A3460d84B69c9D21822aa9aaDaDa'
);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
