import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0xE20A182F39854ac2A5d55FC2D210Ca42A84d1A53'
);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
