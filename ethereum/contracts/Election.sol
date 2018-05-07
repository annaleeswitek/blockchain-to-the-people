pragma solidity ^0.4.18;

contract ElectionFactory {
  address[] public deployedElections;

  function createElection (uint code) public {
    address newElection = new Election(code, msg.sender);
    deployedElections.push(newElection);
  }

  function getDeployedElections() public view returns (address[]) {
    return deployedElections;
  }
}

contract Election {
  struct Candidate {
    string name;
    uint count;
  }

  struct Voter {
    bool voted;
    uint vote;
  }

  mapping(address => Voter) voters;
  Candidate[] public candidates;
  address public admin;
  uint private _code; //(? come back to this!)

  modifier restricted() {
    require(msg.sender == admin);
    _;
  }

  function Election(uint setCode, address creator) {
    admin = creator;
    _code = setCode;
  }

  function createCandidate(string name) public restricted {
    Candidate memory newCandidate = Candidate({
      name: name,
      count: 0
    });
    candidates.push(newCandidate);
  }

  function code() public view restricted returns (uint) {
    return _code;
  }

  function submitVote(uint voterCode, uint candidateIndex) public {
    require(voterCode == _code); //they have the code that allows them to vote
    require(!voters[msg.sender].voted); //they haven't voted yet
    voters[msg.sender].vote = candidateIndex;
    candidates[candidateIndex].count++;
  }

  function getCandidatesCount() public view returns (uint) {
      return candidates.length;
  }
}
