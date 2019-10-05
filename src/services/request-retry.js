import request from 'request';

const SIMULATED_ERROR_RATE = 10; // Represents 10%

const requestRetrier = options => new Promise((resolve) => {
  request(options, (error, r, response) => {
    if (error) {
      return resolve(requestRetrier(options));
    }
    // Generate an integer between 0 and 100
    // If it is below SIMULATED_ERROR_RATE, we throw an error
    if (Math.floor(Math.random() * 100) < SIMULATED_ERROR_RATE) {
      return resolve(requestRetrier(options));
    }
    return resolve(response);
  });
});

export default requestRetrier;
