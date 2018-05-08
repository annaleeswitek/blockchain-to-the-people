import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0x3C998ee4204b6ea2eb8D962d705Dbb3E3D0566Ed'
);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
