/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

require('dd-trace').init({
  service: process.env.NEW_RELIC_APP_NAME,
  env: process.env.NODE_ENV || 'dev',
});

console.log('Tracing started');
