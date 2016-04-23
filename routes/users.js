var express = require('express');
var orm = require('../orm.js');
var myres = new orm('./db/students.json',{
  "name": "Иван",
  "surname": "Иванов",
  "teams": [],  // teams if member ids
  "tasks": [], // tasks ids
  "curator": 0, // curator id
  "love": 0
});
var router = express.Router();

/* GET users listing. */
router.get('/all', myres.all );
router.get('/ob/:id', myres.getId );
router.delete('/rm/:id', myres.delD );
router.put('/up/:id', myres.upId );
router.post('/wt', myres.pushD );

router.get('/', function(req, res, next) {
  res.render('users');
});

module.exports = router;
