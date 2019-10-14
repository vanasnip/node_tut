console.log('Before');
const user = getUser(1);
console.log(user); // undefined
console.log('After');

function getUser(id) {
  const githubUsername = 'ivano';
  setTimeout(() => {
    console.log(`Reading a user from database with id ${id}`);
    return {id, githubUsername}
  }, 2000);
}
