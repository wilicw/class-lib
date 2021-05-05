let express = require('express');
let router = express.Router();
const { User } = require('../db');

/* GET user. */
router.get('/:id', async function (req, res, next) {
  const user = await User.findOne({ where: { id: parseInt(req.params.id) } })
  res.json({
    name: user.name
  });
});

module.exports = router;
