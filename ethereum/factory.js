import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0x7fDe5bA05C0d8ea4E11c265b617D711AD468EFc4'

);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
