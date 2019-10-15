//Callbacks


getUser(1, displayUser);

function displayUser(user) {
  console.log(user);
  getRepos(user.githubUsername, displayRepos)
}

function displayRepos(repos) {
  // the begining of call bak hell, then handling for potential error for each
  console.log(repos);
  getCommits(repos[0], displayCommits)
}

function displayCommits(commits) {
  console.log(commits)
}

function getUser(id, callback) {
  const githubUsername = 'ivano';
  setTimeout(() => {
    console.log(`Reading a user from database with id ${id}`);
    callback({ id, githubUsername });
  }, 2000);
}

function getRepos(username, callback) {
  setTimeout(() => {
    let repos = ['repo1', 'repo2', 'repo3', 'repo4'];
    console.log(`Calling github api`);
    callback({ username, repos });
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    let commits = ['commit1', 'commit2', 'commit3', 'commit4']
    callback(commits);
  }, 2000);
}
