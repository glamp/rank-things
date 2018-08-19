const https = require('https');

setInterval(() => {
  if (process.env.DATABASE_URL) {
    console.info(`skipping stay awake as we're not running in production`);
    return;
  }
  https.get('https://calm-badlands-96915.herokuapp.com/', res => {
    if (res.statusCode !== 200) {
      console.log('error fetching myself: ' + res.statusCode);
    }
  });
}, 300000); // every 5 minutes (300000)
