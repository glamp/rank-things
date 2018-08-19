const knex = require('knex');
const fs = require('fs');
const path = require('path');

let options = {};
if (process.env.DATABASE_URL) {
  options = {
    client: 'pg',
    connection: process.env.DATABASE_URL
  };
} else {
  options = {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, './mydb.sqlite'),
      useNullAsDefault: true
    }
  };
}

const db = knex(options);

module.exports = db; 
