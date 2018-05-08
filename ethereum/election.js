import web3 from './web3';
import ElectionFactory from './build/Election.json';

export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(Election.interface),
    address
  );
};
