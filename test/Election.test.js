//Tests for Election contract and the ElectionFactory contract
const assert = require('assert');
const ganache = require ('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require('../ethereum/build/ElectionFactory.json');
const compiledElection = require('../ethereum/build/Election.json');

let accounts;
let factory;
let electionAddress;
let election;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000'});

  await factory.methods.createElection('1234').send({
    from: accounts[0],//admin
    gas: '1000000'
  });

  [electionAddress] = await factory.methods.getDeployedElections().call();
  election = await new web3.eth.Contract(
    //pass in the address when the contract is already deployed and we want to let web3 know of its existence and location
    JSON.parse(compiledElection.interface),
    electionAddress
  );
});

describe('Elections', () => {
  it('deploys a factory and an election', () => {
    assert.ok(factory.options.address);
    assert.ok(election.options.address);
    // console.log('AADDDDMMMIIIINNNNN!!!!!', election.methods.admin.call());
    // console.log('AND HERE IS ACCOUNTS[0]', accounts[0])
  });

  // it('marks caller of createElection as admin', async () => {
  //   const admin = await election.methods.admin.call();
  //   assert.equal(accounts[0], admin);
  // });
});
