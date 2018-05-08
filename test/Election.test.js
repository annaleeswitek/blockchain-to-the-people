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

  //this is an instance of the election 
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000'});


  //pertains to the createElection method on Election 
    //note that we're passing a number as a string for solidity 

    //we use a form where we DON'T specify an address whenever we want to deploy a new form of the contract 
  await factory.methods.createElection('1234').send({
    from: accounts[0],//admin
    gas: '1000000'
  });  

  //this returns an array of addresses for already-deployed campaigns 
  [electionAddress] = await factory.methods.getDeployedElections().call();

  //this returns an instance of the contract that now exists on our local test network 
  election = await new web3.eth.Contract(
    //pass in the address when the contract is already deployed and we want to let web3 know of its existence and location
    //if we've already deployed the contract we have to pass in the interface as the first arg 
    JSON.parse(compiledElection.interface),
    electionAddress
  );


});

describe('Elections', () => {
  it('deploys a factory and an election', () => {
    assert.ok(factory.options.address);
    assert.ok(election.options.address);
  });

  it('marks caller of createElection as admin', async () => {
    const admin = await election.methods.admin().call();
    assert.equal(accounts[0], admin);
  });

  it('allows admin to create a candidate', async() => {
    await election.methods.createCandidate('Dolores Umbridge')
      .send({
        from: accounts[0], 
        gas: '1000000'
      }); 
    const newCandidate = await election.methods.candidates(0).call(); 
    assert(newCandidate); 
  }); 

  it('does not allow non-admins to create a candidate', async() => {
    try { 
      await campaign.methods.createCandidate("Lucius Malfoy")
        .send({
          from: accounts[1], 
          gas: '1000000'
        }); 
        assert(false); 
    } catch(err) {
      assert(err); 
    }
  }); 

  it('has a code associated with the election', async() => {
    const code = await election.methods.code().call(); 
    assert.equal('1234', code); 
  }); 

  it('shows the current length of the candidates array', async() => {
    const candidatesLength = await election.methods.getCandidatesCount().call(); 
    assert(1, candidatesLength); 
  })

  it('will have the candidates array increment for each candidate', async() => {
    await election.methods.createCandidate('Dolores Umbridge')
      .send({
        from: accounts[0], 
        gas: '1000000'
    }); 

    await election.methods.createCandidate('Lucius Malfoy')
      .send({
        from: accounts[0], 
        gas: '1000000'
      }); 

    const candidateLength = await election.methods.getCandidatesCount().call(); 
    assert(2, candidateLength); 
  }); 

  it('will let a voter submit a vote', async() => {
    await election.methods.createCandidate('Dolores Umbridge')
      .send({
        from: accounts[0], 
        gas: '1000000'
    }); 

    await election.methods.createCandidate('Lucius Malfoy')
      .send({
        from: accounts[0], 
        gas: '1000000'
      }); 

    const candidateLength = await election.methods.getCandidatesCount().call(); 
    assert(2, candidateLength); 

    await election.methods.submitVote('1234', '0')
      .send({
        from: accounts[1], 
        gas: '1000000'
      })
    const isVoter = await election.methods.voters(0).call();
    assert(isVoter); 
  }); 

});;


