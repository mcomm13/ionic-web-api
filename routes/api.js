const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

// Connect
const url = process.env.MONGO_CONNECTION;
console.log(url);

const connection = closure => {
  return MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        return console.error(err);
      }
      console.log('Connected successfully to server');
      const db = client.db();
      closure(db);
    }
  );
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: ''
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err === 'object' ? err.message : err;
  res.send(501).json(response);
};

// Get blogs
router.get('/blogs', (req, res) => {
  connection(db => {
    db.collection('blog')
      .find()
      .toArray()
      .then(blogs => {
        response.data = blogs;
        res.json(response);
      })
      .catch(err => {
        sendError(err, res);
      });
  });
});

// Get songs
router.get('/music', (req, res) => {
  connection(db => {
    db.collection('music')
      .find()
      .toArray()
      .then(music => {
        response.data = music;
        res.json(response);
      })
      .catch(err => {
        sendError(err, res);
      });
  });

  // Test - do nothing
  router.get('/ping', (req, res) => {
    res.json("We're all good here!");
  });
});

module.exports = router;
