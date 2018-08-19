const knex = require('knex');
const fs = require('fs');
const path = require('path');
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, './mydb.sqlite'),
    useNullAsDefault: true
  }
});

module.exports = db; 
