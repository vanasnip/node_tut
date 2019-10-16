const p = Promise.resolve({ id: 1 });
p.then(result => console.log(`result: ${result}`));

const x = Promise.reject(new Error('reason for rejection'));
x.catch(error => console.log(`error: ${error.message}`));

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 1...')
    reject(new Error('this is an error'));
  }, 4000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 2...')
    resolve(2);
  }, 2000);
});

Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(error => console.log(`Error: ${error}`));

Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(error => console.log(`Error: ${error}`));
