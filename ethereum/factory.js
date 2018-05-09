import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0x79D65dE67f8C1A4c7AeC0B520a214C632ce26E11'
);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
