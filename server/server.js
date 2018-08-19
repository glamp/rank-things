const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const _ = require('lodash');
const db = require('./db');
const elo = require('./elo');

require('./keep-awake');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.send('hi');
});

app.get('/polls', (req, res) => {
  db('polls')
    .then(data => {
      res.json({
        status: "OK",
        data
      });
    });
});

app.get('/rankings/:poll_id', (req, res) => {
  db('rankables')
    .where('poll_id', '=', req.params.poll_id)
    .then(rankables => {
      rankables = _.keyBy(rankables, 'id');
      db('matchups')
        .where('poll_id', '=', req.params.poll_id)
        .orderBy('ts', 'asc')
        .then(data => {
          data = elo(data);
          data.map(item => {
            return _.merge(item, rankables[item.rankable_id]);
          });
          res.json({
            status: "OK",
            data
          });
        });
    })
});

app.post('/polls', (req, res) => {
  const { name, data } = req.body;
  const pollId = shortid.generate();

  const rankables = data.map(item => {
    item.id = shortid.generate();
    item.poll_id = pollId;
    return item;
  });

  db('polls')
    .insert({
      id: pollId,
      name
    })
    .then(() => {
      db('rankables')
        .insert(rankables)
        .then(() => {
          res.json({
            status: "OK"
          });
        })
    })
});

app.get('/matchup/:poll_id', (req, res) => {
  db('rankables')
    .where('poll_id', '=', req.params.poll_id)
    .orderByRaw('RANDOM()')
    .limit(2)
    .then(data => {
      res.json({
        status: "OK",
        data
      });
    });
});

app.post('/matchup/:poll_id', (req, res) => {
  const row = {
    id: shortid.generate(),
    poll_id: req.params.poll_id,
    winner_id: req.body.winnerId,
    loser_id: req.body.loserId,
    ts: +new Date(),
  };
  db('matchups')
    .insert(row)
    .then(() => {
      res.send('OK');
    })
    .catch(err => {
      res.status(500);
      console.log(err);
      res.send(err.toString());
    });
});

app.listen(process.env.PORT || 3001, () => console.log('servering :3001'))
