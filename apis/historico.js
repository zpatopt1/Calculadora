// api1.js
const express = require('express');
const router = express.Router();

router.get('/historico', (req, res) => {
  res.send('Esta é a API 2');
});

module.exports = router;
