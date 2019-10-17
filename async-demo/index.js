//Callbacks

/*
getUser(1)
  .then(({ githubUsername: user }) => getRepos(user))
  .then(({ repos }) => getCommits(repos[0]))
  .then(({ commits }) => console.log(`finally got the commits I was after...`))
  .catch(err => console.error(err.message));
*/

accessCommits();
// Async and Await approach
async function accessCommits() {
  try {
    const { githubUsername } = await getUser(1);
    const { repos } = await getRepos(githubUsername);
    const commits = await getCommits(repos[0]);
  } catch (err) {
    console.error(err.message);
  }
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Date.now() % 3 === 0) {
        reject(new Error(`error getting user`));
      } else {
        const user = { id, githubUsername: 'ivano' };
        console.log(`Managed to get user ${user.githubUsername}`);
        resolve(user);
      }
    }, 2000);
  })
}

function getRepos(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Date.now() % 3 === 0) {
        reject(new Error(`error getting repos`));
      } else {
        let repos = ['repo1', 'repo2', 'repo3', 'repo4'];
        console.log(`Managed to get repos ${repos}`);
        resolve({ username, repos });
      }
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Date.now() % 3 === 0) {
        reject(new Error(`error getting commits`));
      } else {
        let commits = ['commit1', 'commit2', 'commit3', 'commit4']
        console.log(`Managed to get commits ${commits}`);
        resolve({ commits });
      }
    }, 2000);
  });
}
