import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const contractInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),

  '0xEA2655A51481B0b6c5F7B05D544aF0b7f857Fd87'
);

export default contractInstance;
//now we don't have to write this out every time we want to interact with our deployed ElectionFactory
