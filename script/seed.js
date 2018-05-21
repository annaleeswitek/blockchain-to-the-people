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
  // const activeCandidatesList = [
  //   {
  //     name: 'Angela Merkel',
  //     affiliation: 'CDU/CSU',
  //     voteCount: 0,
  //     arrayIndex: 0,
  //     description: "Merkel is a German politician serving as Chancellor of Germany since 2005 and leader of the centre-right Christian Democratic Union (CDU) since 2000.[7] Merkel has been widely described as the de facto leader of the European Union, the most powerful woman in the world, and the leader of the Free World.",
  //     imageURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Angela_Merkel._Tallinn_Digital_Summit.jpg/220px-Angela_Merkel._Tallinn_Digital_Summit.jpg'
  //   },
  //   {
  //     name: 'Martin Schultz',
  //     affiliation: 'SPD',
  //     voteCount: 0,
  //     arrayIndex: 1,
  //     description: 'Schultz is a German politician who was previously President of the European Parliament from 2012 to 2017, Leader of the Progressive Alliance of Socialists and Democrats from 2004 to 2012 and a Member of the European Parliament (MEP) from Germany from 1994 to 2017',
  //     imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/2017-09-14_Martin_Schulz_SPD_9489.jpg/220px-2017-09-14_Martin_Schulz_SPD_9489.jpg'
  //   },
  //   {
  //     name: 'Alice Weidel',
  //     affiliation: 'AfD',
  //     voteCount: 0,
  //     arrayIndex: 2,
  //     description: 'Weidel is the first lesbian to serve as a lead candidate of her party, which opposes same-sex marriage and adoptions.',
  //     imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/2017-11-29-Alice_Weidel-Maischberger-5664.jpg/220px-2017-11-29-Alice_Weidel-Maischberger-5664.jpg'
  //   },
  //   {
  //     name: 'Christian Linder',
  //     affiliation: 'FDP',
  //     voteCount: 0,
  //     arrayIndex: 3,
  //     description: 'Linder is a German politician, member of the Bundestag and leader of the liberal Free Democratic Party of Germany. Lindner joined the FDP in 1995. He has been a member of the Executive Board of the FDP in the state of North Rhine-Westphalia since 1998 and became Secretary General in 2004 (until February 2010).',
  //     imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/ChristianLindner-FDP-1_%28cropped_1%29.jpg/1024px-ChristianLindner-FDP-1_%28cropped_1%29.jpg'
  //   },
  //   {
  //     name: 'Sahra Wagenknecht',
  //     affiliation: 'The Left',
  //     voteCount: 0,
  //     arrayIndex: 4,
  //     description: 'Wagenknecht is a German left-wing politician, economist, author and publicist. She is with Dietmar Bartsch parliamentary chairperson of Die Linke. Since 2009, she has been a member of the Bundestag.',
  //     imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/14-09-11-Sarah-Wagenknecht-RalfR-008.jpg/1024px-14-09-11-Sarah-Wagenknecht-RalfR-008.jpg'
  //   },
  //   {
  //     name: 'Katrin Göring-Eckardt',
  //     affiliation: 'Green',
  //     voteCount: 0,
  //     arrayIndex: 5,
  //     description: 'Göring-Eckardt is a German politician from the German Green Party. Starting her political activity in the now-former German Democratic Republic(East Germany) in the late 1980s, she has been a member of the German Bundestag since 1998',
  //     imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Katrin_Goring-Eckhardt_Cropped.jpg/220px-Katrin_Goring-Eckhardt_Cropped.jpg'
  //   }
  // ]

  const upcomingCandidatesList = [
    {
      name: 'Lee Zeldin',
      affiliation: 'Republican',
      voteCount: 0,
      arrayIndex: 0,
      description: `Lee Zeldin (b. January 30, 1980) is a Republican member of the U.S. House of Representatives, representing New York's 1st Congressional District. Zeldin was first elected to the House in 2014. Zeldin is currently the only Jewish Republican member of Congress.`,
      imageURL: 'https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/Lee_Zeldin_new_official_portrait.jpg'
    },
    {
      name: 'Kathleen M. Rice',
      affiliation: 'Democrat',
      voteCount: 0,
      arrayIndex: 1,
      description: `Kathleen M. Rice (b. February 15, 1965, in New York City, N.Y.) is a Democratic member of the U.S. House of Representatives, representing New York's 4th Congressional District. Rice was first elected to the House in 2014.`,
      imageURL: 'https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/Kathleen_M._Rice.jpg'
    },
    {
      name: 'Yvette D. Clark',
      affiliation: 'Democrat',
      voteCount: 0,
      arrayIndex: 2,
      description: `Yvette D. Clarke (b. November 21, 1964, in Brooklyn, N.Y.) is a Democratic member of the United States House of Representatives representing New York's 9th Congressional District. Clarke was first elected to the House in New York's 11th Congressional District in 2006. Due to redistricting, she ran in the 9th District in 2012.`,
      imageURL: 'https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/Yvette_Clark.jpeg'
    },
    {
      name: 'Daniel M. Donovan, Jr',
      affiliation: 'Republican',
      voteCount: 0,
      arrayIndex: 3,
      description: `Daniel M. Donovan, Jr. (b. November 6, 1956, in Staten Island, New York) is a Republican member of the U.S. House representing the 11th Congressional District of New York. He was first elected in a special election on May 5, 2015.`,
      imageURL: 'https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/Dan_Donovan.jpg'
    },
    {
      name: 'Claudia Tenney',
      affiliation: 'Republican',
      voteCount: 0,
      arrayIndex: 4,
      description: `Claudia Tenney is a Republican member of the U.S. House representing the 22nd Congressional District of New York. Tenney was first elected to the House in 2016.`,
      imageURL: `https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/Claudia_Tenney,_115th_official_photo-7.jpg`
    },
    {
      name: 'Hakeem Jeffries',
      affiliation: 'Democrat',
      voteCount: 0,
      arrayIndex: 5,
      description: `Hakeem Jeffries (b. August 4, 1970, in Crown Heights, N.Y.) is a Democratic member of the United States House of Representatives representing New York's 8th Congressional District. Jeffries was first elected to the House on November 6, 2012.`,
      imageURL: `https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/HakeemJeffries.jpg`
    },
    {
      name: 'Nydia Velazquez',
      affiliation: 'Democrat',
      voteCount: 0,
      arrayIndex: 6,
      description: `Nydia Velazquez (b. March 28, 1958, in Yabucoa, PR) is a Democratic member of the United States House of Representatives representing New York's 7th Congressional District. Velázquez was first elected to the House in 1992`,
      imageURL: 'https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/Nydia_Velazquez.jpg'
    }
  ];

  // const candidates = await Promise.all(
  //   candidatesList.map(candidate => Candidate.create(candidate))
  // );

  const pastCandidates = await Promise.all(
    pastCandidatesList.map(candidate => Candidate.create(candidate))
  )

  console.log(`seeded ${pastCandidates.length} candidates`);
  // const activeCandidates = await Promise.all(
  //   activeCandidatesList.map(candidate => Candidate.create(candidate))
  // );

  // console.log(`seeded ${activeCandidates.length} activeCandidates`);

  const upcomingCandidates = await Promise.all(
    upcomingCandidatesList.map(candidate => Candidate.create(candidate))
  );

  console.log(`seeded ${upcomingCandidates.length} candidates`);

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

  console.log(`seeded ${pastElections.length} elections`);

  // const activeElectionInfo = {
  //   name: 'German Federal Election 2017',
  //   startDate: 'Sat May 09 2018 08:00:00 EST-0400 (EST)',
  //   endDate: 'Sun August 30 2018 08:00:00 EST-0400 (EST)',
  //   blockchainAddress: '0xb571C21E823026A26A49081e4d9ECa54f6D2166A'
  // };

  // const activeElection = await Election.create(activeElectionInfo);

  // const addCandidatesToActiveElection = await Promise.all([
  //   Candidate.findById(9).then(candidate => candidate.setElection(3)),
  //   Candidate.findById(10).then(candidate => candidate.setElection(3)),
  //   Candidate.findById(11).then(candidate => candidate.setElection(3)),
  //   Candidate.findById(12).then(candidate => candidate.setElection(3)),
  //   Candidate.findById(13).then(candidate => candidate.setElection(3)),
  //   Candidate.findById(14).then(candidate => candidate.setElection(3)),
  // ]);

  // const addActiveElectionToCommunity =await Promise.all([
  //     Election.findById(1).then(election => election.setCommunity(3)),
  //     Election.findById(2).then(election => election.setCommunity(3)),
  //     Election.findById(3).then(election => election.setCommunity(3)),
  //   ])


  // console.log(`seeded active election!`);

  const upcomingElectionsList = [
    {
      name: 'New York State Assembly Special Elections, District 12',
      startDate: 'Tue May 30 2018 08:00:00 EST-0400 (EST)',
      endDate: 'Tue May 30 2018 16:00:00 EST-0400 (EST)',
      blockchainAddress: '0xBF0C74eEB0166d1E4291e5ebEFA9f3923f18fFd8'
    },
    {
      name: 'New York State Senate Special Elections, District 24',
      startDate: 'Thurs June 07 2018 08:00:00 EST-0400 (EST)',
      endDate: 'Thurs June 07 2018 18:00:00 EST-0400 (EST)',
      blockchainAddress: '0xBF0C74eEB0166d1E4291e5ebEFA9f3923f18fFd8'
    }
  ];

  const upcomingElections = await Promise.all(
    upcomingElectionsList.map(election => Election.create(election))
  );

  const addCandidatesToUpcomingElections = await Promise.all([
    Candidate.findById(15).then(candidate => candidate.setElection(4)),
    Candidate.findById(16).then(candidate => candidate.setElection(4)),
    Candidate.findById(17).then(candidate => candidate.setElection(4)),
    Candidate.findById(18).then(candidate => candidate.setElection(5)),
    Candidate.findById(19).then(candidate => candidate.setElection(5)),
    Candidate.findById(20).then(candidate => candidate.setElection(5)),
    Candidate.findById(21).then(candidate => candidate.setElection(5)),
  ])

  const addUpcomingElectionsToCommunity =await Promise.all([
    Election.findById(4).then(election => election.setCommunity(3)),
    Election.findById(5).then(election => election.setCommunity(3))
  ])

  console.log(`seeded ${upcomingElections.length} elections`);

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
