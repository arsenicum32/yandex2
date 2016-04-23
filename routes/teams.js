var express = require('express');
var orm = require('../orm.js');
var teamobj = new orm('./db/teams.json',{
  "name": "Актимель",
  "tizer": "Мы все молодцы",
  "curator": 0,
  "party": []
});
var router = express.Router();

/* GET users listing. */
router.get('/all', teamobj.all );
router.get('/ob/:id', teamobj.getId );
router.delete('/rm/:id', teamobj.delD );
router.put('/up/:id', teamobj.upId );
router.post('/wt', teamobj.pushD );

router.get('/', function(req, res, next) {
  res.render('teams');
});

module.exports = router;
