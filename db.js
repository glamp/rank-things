const knex = require('knex');
const fs = require('fs');
const path = require('path');
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite",
    useNullAsDefault: true
  }
});

module.exports = db; 
