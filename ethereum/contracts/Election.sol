pragma solidity ^0.4.21;

contract ElectionFactory {
  address[] public deployedElections;

  event ElectionLog(
    address election
  );

  function createElection (uint code) public {
    address electionAddress = new Election(code, msg.sender);
    uint electionId = deployedElections.push(electionAddress)-1;
    // emit the event based on the contract integer
    emit ElectionLog(deployedElections[electionId]);
  }

  function getDeployedElections() public view returns (address[]) {
    return deployedElections;
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
contract Election {
  struct Candidate {
    string name;
    uint count;
  }

  struct Voter {
    bool voted;
    uint vote;
  }

    event CandidateLog(
        string name,
        uint count,
        uint index
    );

  mapping(address => Voter) voters;
  Candidate[] public candidates;
  address public admin;
  uint private _code; //(? come back to this!)

  modifier restricted() {
    require(msg.sender == admin);
    _;
  }

  function Election(uint setCode, address creator) public {
    admin = creator;
    _code = setCode;
  }

  function createCandidate(string name) public restricted {
    Candidate memory newCandidate = Candidate({
      name: name,
      count: 0
    });
    candidates.push(newCandidate);
    emit CandidateLog(newCandidate.name, newCandidate.count, candidates.length-1);
  }

  function code() public view restricted returns (uint) {
    return _code;
  }

  function submitVote(uint voterCode, uint candidateIndex) public {
    require(voterCode == _code); //they have the code that allows them to vote
    require(!voters[msg.sender].voted); //they haven't voted yet
    // voters[msg.sender].voted = true;
    Candidate storage candidate = candidates[candidateIndex]; 
    voters[msg.sender].vote = candidateIndex;
    candidates[candidateIndex].count++;

    emit CandidateLog(candidates[candidateIndex].name, candidates[candidateIndex].count, candidateIndex);
  }

  function getCandidatesCount() public view returns (uint) {
      return candidates.length;
  }
}
