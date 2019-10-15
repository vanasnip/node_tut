const p = new Promise((resolve, reject) => {
  //pending!
  setTimeout(() => {
    //resolve(1); // resolved!
    reject(new Error('message')); // rejected!
  }, 2000);
})

p.then(result => console.log(`Result: ${result}`))
.catch(err => console.log(`Error: ${err.message}`));
