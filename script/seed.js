'use strict';

const db = require('../server/db');
const { User, Candidate, Community, Election } = require('../server/db/models');

async function seed () {
  await db.sync({ force: true });
  console.log('db synced!');

  // -- USERS --

  const usersList = [
    {
      name: 'Annalee Switek',
      email: 'annalee@annalee.com',
      password: 'annalee'
    },
    {
      name: 'Tasnuva Noor',
      email: 'tasnuva@tasnuva.com',
      password: 'tasnuva'
    },
    {
      name: 'Melissa Bellah',
      email: 'melissa@melissa.com',
      password: 'melissa'
    },
    {
      name: 'Christen Martin',
      email: 'christen@christen.com',
      password: 'christen'
    },
    {
      name: 'Ms. Admin',
      email: 'admin@admin.com',
      password: 'admin',
      isAdmin: true
    }
  ];

  const users = await Promise.all(
    usersList.map(user => User.create(user))
  );

  console.log(`seeded ${users.length} users`);

  // -- CANDIDATES --

  const candidatesList = [
    {
      name: 'Bernie Sanders',
      affiliation: 'Democrat',
      voteCount: 500,
      arrayIndex: 1
    },
    {
      name: 'Kieth Ellison',
      affiliation: 'Democrat',
      voteCount: 550,
      arrayIndex: 1
    },
    {
      name: 'Elizabeth Warren',
      affiliation: 'Democrat',
      voteCount: 100,
      arrayIndex: 1
    },
    {
      name: 'Mark Zuckerberg',
      affiliation: 'Democrat',
      voteCount: 50,
      arrayIndex: 1
    },
    {
      name: 'Lord Voldemort',
      affiliation: 'Republican',
      voteCount: 10,
      arrayIndex: 1
    },
    {
      name: 'Jill Stein',
      affiliation: 'Green Party',
      voteCount: 50,
      arrayIndex: 1
    },
    {
      name: 'Brian Kavanagh',
      affiliation: 'Democratic',
      voteCount: 17782,
      arrayIndex: 1
    },
    {
      name: 'Analicia Alexander',
      affiliation: 'Republican',
      voteCount: 4072,
      arrayIndex: 1
    },
    {
      name: 'Unrecorded',
      affiliation: 'Other',
      voteCount: 5079,
      arrayIndex: 1
    },
    {
      name: 'Write-ins',
      affiliation: 'Other',
      voteCount: 143,
      arrayIndex: 1
    },

  ];

  const candidates = await Promise.all(
    candidatesList.map(candidate => Candidate.create(candidate))
  );

  console.log(`seeded ${candidates.length} candidates`);

  // -- COMMUNITIES --

  const communitiesList = [
    {
      name: 'New York State Senate',
      location: 'New York State',
      timeZone: 'EST'
    },
    {
      name: 'Occupy Walstreet',
      location: 'New York City',
      timeZone: 'EST'
    },
    {
      name: 'Board of Directors of Google',
      location: 'Mountain View',
      timeZone: 'PST'
    }
  ];

  const communities = await Promise.all(
    communitiesList.map(community => Community.create(community))
  );

  const addUsersToCommunities = await Promise.all([
    User.findById(1).then(category => category.setCommunity(1)),
    User.findById(2).then(category => category.setCommunity(1)),
    User.findById(3).then(category => category.setCommunity(3)),
    User.findById(4).then(category => category.setCommunity(3)),
    User.findById(5).then(category => category.setCommunity(3)),
  ]);

  console.log(`seeded ${communities.length} communities`);

  // -- ELECTIONS --

  const electionsList = [
    {
      name: 'Spring 2018 Primary',
      startDate: 'Fri May 08 2018 16:21:00 EST-0400 (EST)',
      endDate: 'Fri May 09 2018 08:00:00 EST-0400 (EST)',
      blockchainAddress: '0xBF0C74eEB0166d1E4291e5ebEFA9f3923f18fFd8'
    },
    {
      name: 'New York state legislative special elections, District 26',
      startDate: 'Tue Nov 07 2017 08:00:00 EST-0400 (EST)',
      endDate: 'Tue Nov 07 2017 18:00:00 EST-0400 (EST)',
      blockchainAddress: '0xBF0C74eEB0166d1E4291e5ebEFA9f3923f18fFd8'
    },
    {
      name: 'New Board Member Vote',
      startDate: 'Mon May 29 2018 08:00:00 EST-0400 (EST)',
      endDate: 'Tues May 30 2018 08:00:00 EST-0400 (EST)',
      blockchainAddress: '0xBF0C74eEB0166d1E4291e5ebEFA9f3923f18fFd8'
    }
  ];

  const elections = await Promise.all(
    electionsList.map(election => Election.create(election))
  );

  const addCandidatesToElections = await Promise.all([
    Candidate.findById(1).then(candidate => candidate.setElection(1)),
    Candidate.findById(2).then(candidate => candidate.setElection(1)),
    Candidate.findById(3).then(candidate => candidate.setElection(1)),
    Candidate.findById(4).then(candidate => candidate.setElection(1)),
    Candidate.findById(5).then(candidate => candidate.setElection(3)),
    Candidate.findById(6).then(candidate => candidate.setElection(3)),
    Candidate.findById(7).then(candidate => candidate.setElection(2)),
    Candidate.findById(8).then(candidate => candidate.setElection(2)),
    Candidate.findById(9).then(candidate => candidate.setElection(2)),
    Candidate.findById(10).then(candidate => candidate.setElection(2)),
  ]);

  const addElectionsToCommunities = await Promise.all([
    Election.findById(1).then(election => election.setCommunity(3)),
    Election.findById(2).then(election => election.setCommunity(1)),
    Election.findById(3).then(election => election.setCommunity(3))
  ]);

  console.log(`seeded ${elections.length} elections`);

}

seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

console.log('seeding...');
