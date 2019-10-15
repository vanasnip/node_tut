//Callbacks

console.log('Before');
getUser(1,(user)=>{
  getRepos(user.githubUsername, (repos)=>{ // the begining of call bak hell, then handling for potential error for each
    console.log(repos);
  })
}); // called when setTimeout runs, effectively saying I'm done);
//console.log(user); // undefined
console.log('After');

function getUser(id, callback) {
  const githubUsername = 'ivano';
  setTimeout(() => {
    console.log(`Reading a user from database with id ${id}`);
    callback( {id, githubUsername});
  }, 2000);
}

function getRepos(username, callback){
  setTimeout(()=>{
    let repos = ['repo1', 'repo2', 'repo3', 'repo4'];
    console.log(`Calling github api`);
    callback({username, repos});
  }, 2000);
}
