'use strict';

const db = require('../server/db');
const { User, Candidate, Community, Election } = require('../server/db/models');

async function seed () {
  await db.sync({ force: true });
  console.log('db synced!');

  const candidatesList = [{
    name: 'Bernie Sanders',
    affiliation: 'Democrat'
  }];

  const candidates = await Promise.all(
    candidatesList.map(candidate => Candidate.create(candidate))
  );

  console.log(`seeded ${candidates.length} candidates`);

  const communitiesList = [{
    name: 'City of Philadelphia',
    location: 'Philadelphia',
    timeZone: 'EST'
  }];

  const communities = await Promise.all(
    communitiesList.map(community => Community.create(community))
  );

  console.log(`seeded ${communities.length} communities`);

  const electionsList = [{
    name: 'Spring 2018 Primary'
  }];

  const elections = await Promise.all(
    electionsList.map(election => Election.create(election))
  );

  console.log(`seeded ${elections.length} elections`);

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
    }
  ];

  const users = await Promise.all(
    usersList.map(user => User.create(user))
  );

  console.log(`seeded ${users.length} users`);
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
