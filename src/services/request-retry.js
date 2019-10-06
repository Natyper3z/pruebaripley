import request from 'request';

const SIMULATED_ERROR_RATE = 10; // 10% de error

const requestRetrier = options => new Promise((resolve) => {
  request(options, (error, r, response) => {
    if (error) {
      return resolve(requestRetrier(options));
    }
    // Genera un INT  entre 0 y 100
    // Error
    if (Math.floor(Math.random() * 100) < SIMULATED_ERROR_RATE) {
      return resolve(requestRetrier(options));
    }
    return resolve(response);
  });
});

export default requestRetrier;
