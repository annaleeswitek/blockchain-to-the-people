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

  const pastCandidatesList = [
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
    {
      name: 'Christine Pellegrino',
      affiliation: 'Democratic',
      voteCount: 5324,
      arrayIndex: 1
    },
    {
      name: 'Thomas Gargiulo',
      affiliation: 'Republican',
      voteCount: 3181,
      arrayIndex: 1
    },
    {
      name: 'Albert Thompson',
      affiliation: 'Independence',
      voteCount: 292,
      arrayIndex: 1
    },
    {
      name: 'John Smith',
      affiliation: 'Conservative',
      voteCount: 867,
      arrayIndex: 1
    },
  ]
  const activeCandidatesList = [
    {
      name: 'Rosa Franklin',
      affiliation: 'Scientist',
      voteCount: 0,
      arrayIndex: 0,
      description: "It may have taken humanity much, much longer to discover the double-helix structure of DNA without Rosalind Franklin’s work. In fact, it has been suggested that she could have discovered the entire double-helix model on her own within a year, if a parallel discovery had not been made based (partially) on her research data.",
      imageURL:'https://upload.wikimedia.org/wikipedia/en/e/e9/Rosalind_Franklin_%281920-1958%29.jpg'
    },
    {
      name: 'Sappho',
      affiliation: 'Poet',
      voteCount: 0,
      arrayIndex: 1,
      description: '(630 and 612 BC)- Included among the nine lyric poets of ancient Greece, little of Sappho\'s writing has survived; but what has survived is a rich influence on western society and a provocative philosophy and lifestyle that challenges us even today.',
      imageURL: 'https://qph.fs.quoracdn.net/main-qimg-8e166d74a6e7e1b8ff6e8d84e84af88c'
    },
    {
      name: 'Flannery O\'Conner',
      affiliation: 'Writer',
      voteCount: 0,
      arrayIndex: 2,
      description: '(1925-1964)- Leading member of the Southern Gothic movement, the American master of prose both in the short and long form. Along with William Faulkner, O\'Conner perhaps grasped the Southern experience like few others.Her short story A Good Man is Hard to Find is considered a landmark for the short form.',
      imageURL: 'https://qph.fs.quoracdn.net/main-qimg-8dc8ebab32e1e311c96778aff425e75f'
    },
    {
      name: 'Frida Kahlo',
      affiliation: 'Artist',
      voteCount: 0,
      arrayIndex: 3,
      description: '(1907-1957)- Shocking, controversial, and thought provoking both in her art and in her personal life. Frida\'s many self portraits challenged what should be at the center of a work of art, and her style often challenged how an artist should depict it.',
      imageURL: 'https://qph.fs.quoracdn.net/main-qimg-9590bb2a08ae42ad56f1730e6b233c4d'
    },
    {
      name: 'Maryam Mirzakhani',
      affiliation: 'Mathematician',
      voteCount: 0,
      arrayIndex: 4,
      description: 'She is an Iranian mathematician who serves as a professor of mathematics at Stanford University. She is the the first woman and Iranian to win the Fields Medal, the most prestigious award in mathematics. The Fields Medal and the Abel Prize have often been described as the "mathematician\'s Nobel Prize"',
      imageURL: 'https://qph.fs.quoracdn.net/main-qimg-90d6c37b286d5be2e131fa4d58ada603-c'
    },
    {
      name: 'Rear Admiral Dr. Grace Hopper',
      affiliation: 'Computer Science',
      voteCount: 0,
      arrayIndex: 5,
      description: ' Grace Hopper was one of the most accomplished women in computer science. She held a Ph.D. in mathematics and taught at Vassar until she joined the Navy during World War II. She served in the Naval Reserves for most of her life, eventually achieving the rank of Rear Admiral.',
      imageURL: 'https://qph.fs.quoracdn.net/main-qimg-08742725c88e7d39c39b839c2f73044f-c'
    }
  ]

  // const candidates = await Promise.all(
  //   candidatesList.map(candidate => Candidate.create(candidate))
  // );

  const pastCandidates = await Promise.all(
    pastCandidatesList.map(candidate => Candidate.create(candidate))
  )

  console.log(`seeded ${pastCandidates.length} candidates`);
  const activeCandidates = await Promise.all(
    activeCandidatesList.map(candidate => Candidate.create(candidate))
  );

  console.log(`seeded ${activeCandidates.length} activeCandidates`);

  // -- COMMUNITIES --

  const communitiesList = [
    {
      name: 'New York State',
      location: 'New York, USA',
      timeZone: 'EST'
    },
    {
      name: 'New York State',
      location: 'New York, USA',
      timeZone: 'EST'
    },
    {
      name: 'New York State',
      location: 'New York, USA',
      timeZone: 'EST'
    }
  ];

  const communities = await Promise.all(
    communitiesList.map(community => Community.create(community))
  );

  const addUsersToCommunities = await Promise.all([
    User.findById(1).then(category => category.setCommunity(3)),
    User.findById(2).then(category => category.setCommunity(3)),
    User.findById(3).then(category => category.setCommunity(3)),
    User.findById(4).then(category => category.setCommunity(3)),
    User.findById(5).then(category => category.setCommunity(3)),
  ]);

  console.log(`seeded ${communities.length} communities`);

  // -- ELECTIONS --

  const pastElectionsList = [
    {
      name: 'New York State Assembly Special Elections, District 9',
      startDate: 'Tue May 23 2017 08:00:00 EST-0400 (EST)',
      endDate: 'Tue May 23 2017 16:00:00 EST-0400 (EST)',
      blockchainAddress: '0xBF0C74eEB0166d1E4291e5ebEFA9f3923f18fFd8'
    },
    {
      name: 'New York State Senate Special Elections, District 26',
      startDate: 'Tue Nov 07 2017 08:00:00 EST-0400 (EST)',
      endDate: 'Tue Nov 07 2017 18:00:00 EST-0400 (EST)',
    }
  ]

  const activeElectionInfo = {
      name: 'Earth\'s Philosopher Queen',
      startDate: 'Sat May 09 2018 08:00:00 EST-0400 (EST)',
      endDate: 'Sun May 25 2018 08:00:00 EST-0400 (EST)',
      blockchainAddress: '0xBF0C74eEB0166d1E4291e5ebEFA9f3923f18fFd8'
    };

  const pastElections = await Promise.all(
    pastElectionsList.map(election => Election.create(election))
  );

  const addCandidatesToPastElections = await Promise.all([
    Candidate.findById(1).then(candidate => candidate.setElection(1)),
    Candidate.findById(2).then(candidate => candidate.setElection(1)),
    Candidate.findById(3).then(candidate => candidate.setElection(1)),
    Candidate.findById(4).then(candidate => candidate.setElection(1)),
    Candidate.findById(5).then(candidate => candidate.setElection(2)),
    Candidate.findById(6).then(candidate => candidate.setElection(2)),
    Candidate.findById(7).then(candidate => candidate.setElection(2)),
    Candidate.findById(8).then(candidate => candidate.setElection(2)),
  ]);

  // const addElectionsToCommunities = await Promise.all([
  //   Election.findById(1).then(election => election.setCommunity(3)),
  //   Election.findById(2).then(election => election.setCommunity(3)),
  //   Election.findById(3).then(election => election.setCommunity(3))
  // ]);

  console.log(`seeded ${pastElections.length} elections`);
  const activeElection = await Election.create(activeElectionInfo);

  const addCandidatesToActiveElection = await Promise.all([
    Candidate.findById(9).then(candidate => candidate.setElection(3)),
    Candidate.findById(10).then(candidate => candidate.setElection(3)),
    Candidate.findById(11).then(candidate => candidate.setElection(3)),
    Candidate.findById(12).then(candidate => candidate.setElection(3)),
    Candidate.findById(13).then(candidate => candidate.setElection(3)),
    Candidate.findById(14).then(candidate => candidate.setElection(3)),
  ]);

  const addActiveElectionToCommunity =await Promise.all([
      Election.findById(1).then(election => election.setCommunity(3)),
      Election.findById(2).then(election => election.setCommunity(3)),
      Election.findById(3).then(election => election.setCommunity(3)),
    ])


  console.log(`seeded active election!`);

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
