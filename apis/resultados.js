// api1.js
const express = require('express');
const router = express.Router();

router.get('/resultados', (req, res) => {
  res.send('Esta é a API 3');
});

module.exports = router;
