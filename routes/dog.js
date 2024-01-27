var express = require('express');
var router = express.Router();
const request = require('request');

const dogUrl = "https://dog.ceo/api/breeds/image/random";

router.get('/', async (req, res) => {
  request(dogUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      try {
        const data = JSON.parse(body);
        const imageUrl = data.message;
        res.json({ imageUrl });
      } catch (parseError) {
        res.status(500).json({ error: 'Failed to parse dog image data.' });
      }
    } else {
      res.status(response.statusCode || 500).json({ error: 'Failed to fetch dog image.' });
    }
  });
});

module.exports = router;
