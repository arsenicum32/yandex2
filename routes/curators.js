var express = require('express');
var orm = require('../orm.js');
var mycur = new orm('./db/curators.json',{
  "name": "Иван",
  "surname": "Иванов",
  "students": [],
  "love": 0
});
var router = express.Router();

/* GET users listing. */
router.get('/all', mycur.all );
router.get('/ob/:id', mycur.getId );
router.delete('/rm/:id', mycur.delD );
router.put('/up/:id', mycur.upId );
router.post('/wt', mycur.pushD );

router.get('/', function(req, res, next) {
  res.render('curators');
});

module.exports = router;
