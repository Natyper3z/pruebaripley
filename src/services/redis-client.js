import redis from 'redis';

// Time to live; defines time before a key in redis expires
const TTL = 60;
// Defines maximum size of users visited products
const MAX_SIZE = 4;

export const allKey = 'ALL';

// Use default redis://127.0.0.1/6379 or env variable
const client = redis.createClient(process.env.REDIS_URL || null);
client.on('connect', () => {
  console.log('connected to redis client');
});

// Store a single key in redis.
// Keys will be the product partNumber
export const setKey = (key, value, expire = true) => {
  // Set the key and an expiring time for key
  client.set(key, value, () => {
    if (expire) {
      client.expire(key, TTL);
    }
  });
};

// Store multiple keys based on array.
// values element must contain partNumber property.
export const setKeys = (values = []) => {
  values.forEach((value) => {
    const parsed = JSON.stringify(value);
    setKey(value.partNumber, parsed);
  });
};

// Create a list of unique elements with MAX_SIZE as limit
// value must be string
export const setList = (key, value) => {
  // Remove the element of the list if it exists
  client.lrem(key, 0, value, () => {
    // push the new element
    client.lpush(key, value, () => {
      // After the insertion, we trim list to limit elements;
      // We remove the first element inserted, by keeping the range of 0 to MAX_SIZE - 1
      // (list index starts on 0)
      client.ltrim(key, 0, MAX_SIZE - 1);
    });
  });
};

// Get elements from list
export const getList = key => new Promise((resolve, reject) => {
  // this methods returns an array of string
  client.lrange(key, 0, -1, (error, result) => {
    if (error || result.length === 0) {
      return reject();
    }
    return resolve(result);
  });
});

// Get a key from REDIS
// returns a promise with value, or rejects if no value was found or if there was an error
export const getKey = key => new Promise((resolve, reject) => {
  client.get(key, (error, result) => {
    if (error || !result) {
      return reject();
    }
    return resolve(result);
  });
});

export default client;
