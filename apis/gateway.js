// api1.js
const express = require('express');
const router = express.Router();


router.get('/gateway', (req, res) => {
  res.send('Esta é a API 1');
});

module.exports = router;
