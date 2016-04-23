var express = require('express');
var orm = require('../orm.js');
var taskobj = new orm('./db/tasks.json',{
  "name": "Задача 1",
  "desc": "Описание",
  "start": (new Date()).getTime(),
  "end": (new Date()).getTime() + 120000,
  "rating": {} /// { user.id : rating }
});
var router = express.Router();

/* GET users listing. */
router.get('/all', taskobj.all );
router.get('/ob/:id', taskobj.getId );
router.delete('/rm/:id', taskobj.delD );
router.put('/up/:id', taskobj.upId );
router.post('/wt', taskobj.pushD );

router.get('/', function(req, res, next) {
  res.render('tasks');
});

module.exports = router;
