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
      password: 'admin'
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
      voteCount: 500
    },
    {
      name: 'Kieth Ellison',
      affiliation: 'Democrat',
      voteCount: 550
    },
    {
      name: 'Elizabeth Warren',
      affiliation: 'Democrat',
      voteCount: 100
    },
    {
      name: 'Mark Zuckerberg',
      affiliation: 'Democrat',
      voteCount: 50
    },
    {
      name: 'Lord Voldemort',
      affiliation: 'Republican',
      voteCount: 10
    },
    {
      name: 'Jill Stein',
      affiliation: 'Green Party',
      voteCount: 50
    }

  ];

  const candidates = await Promise.all(
    candidatesList.map(candidate => Candidate.create(candidate))
  );

  console.log(`seeded ${candidates.length} candidates`);

  // -- COMMUNITIES --

  const communitiesList = [
    {
      name: 'City of Philadelphia',
      location: 'Philadelphia',
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
    User.findById(3).then(category => category.setCommunity(2)),
    User.findById(4).then(category => category.setCommunity(2)),
    User.findById(5).then(category => category.setCommunity(3)),
  ]);

  console.log(`seeded ${communities.length} communities`);

  // -- ELECTIONS --

  const electionsList = [
    {
      name: 'Spring 2018 Primary',
      startDate: 'Fri May 04 2018 08:00:00 EST-0400 (EST)',
      endDate: 'Fri May 26 2018 08:00:00 EST-0400 (EST)'
    },
    {
      name: 'Vote on who should be president of the pidgeon committee',
      startDate: 'Sat May 27 2018 08:00:00 EST-0400 (EST)',
      endDate: 'Sun May 28 2018 08:00:00 EST-0400 (EST)'
    },
    {
      name: 'New Board Member Vote',
      startDate: 'Mon May 29 2018 08:00:00 EST-0400 (EST)',
      endDate: 'Tues May 30 2018 08:00:00 EST-0400 (EST)'
    }
  ];

  const elections = await Promise.all(
    electionsList.map(election => Election.create(election))
  );

  const addCandidatesToElections = await Promise.all([
    Candidate.findById(1).then(candidate => candidate.setElection(1)),
    Candidate.findById(2).then(candidate => candidate.setElection(1)),
    Candidate.findById(3).then(candidate => candidate.setElection(2)),
    Candidate.findById(4).then(candidate => candidate.setElection(2)),
    Candidate.findById(5).then(candidate => candidate.setElection(3)),
    Candidate.findById(6).then(candidate => candidate.setElection(3)),
  ]);

  const addElectionsToCommunities = await Promise.all([
    Election.findById(1).then(election => election.setCommunity(1)),
    Election.findById(2).then(election => election.setCommunity(2)),
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
