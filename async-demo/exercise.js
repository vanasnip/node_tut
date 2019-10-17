runApp();
async function runApp() {
  try {
    const customer = await getCustomer(1);
    console.log('Customer: ', customer);

    if (customer.isGold) {
      const movies = await getTopMovies();
      console.log('Top movies: ', movies);
      const emailSent = await sendEmail(customer.email, movies);
      console.log(emailSent);
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'mosh@youowememoney.com'
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  })
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Email sent to ${email} listing ${movies.length} movies.`);
    }, 4000);
  })
}
