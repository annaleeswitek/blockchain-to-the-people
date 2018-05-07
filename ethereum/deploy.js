//only ever deploying the factory
/*
Web3 Providers
communication layer between Web3 and the specific ethereum network
every provider we might use will have an identical set of methods on it to
allow web3 (instance) to send a request to the network and receive a response.
*/
const HDWalletProvider = require('truffle-hdwallet-provider');
//provider that also allows us to unlock an account with mnemonic key
const Web3 = require('web3');
const compiledElectionFactory = require('./build/ElectionFactory.json');

const provider = new HDWalletProvider(
  'hotel zone basket crumble foot vault predict jeans federal evil muffin long',
  'https://rinkeby.infura.io/OqziZFLnsd0lVspQlLgb'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting deploy from account: ', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledElectionFactory.interface)
  )
  .deploy({ data: compiledElectionFactory.bytecode })
  .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to: ', result.options.address);
};

deploy();


