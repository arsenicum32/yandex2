```js
   НЕ ЗАГЛЯДЫВАТЬ ДО 25 ОГО!!!!
```

#В чём соль?

С помощью express.router() разбиваем проект на несколько независимых файлов...

Создаём orm.js в котором пишем middleware функции, и наш код в роутерах становится максимально лёгким...

```js
    /* GET users listing. */
    router.get('/all', taskobj.all );
    router.get('/ob/:id', taskobj.getId );
    router.delete('/rm/:id', taskobj.delD );
    router.put('/up/:id', taskobj.upId );
    router.post('/wt', taskobj.pushD );
```

Хмм всего 6 строчек... В которых просто настраивам пути для api и методы... Ничего дописывать не надо, об этом мы позаботились здесь:

```js
   if(req.body[k] || req.query[k]) dat[index][k] = (req.body[k] || req.query[k]);
```

Делаем всё через fs - айайай... Очень грузит сервак... Вместо stream используем read/open - тоже не хорошо... Однако пишем некое описание модели нашей бд, что бы не зафлудить её лишней информацией...

```js
  var orm = require('../orm.js');
  var myres = new orm('./db/students.json',{
    "name": "Иван",
    "surname": "Иванов",
    "teams": [],  // teams if member ids
    "tasks": [], // tasks ids
    "curator": 0, // curator id
    "love": 0
  });
```

Недопускаем ничего лишнего и используем дефолтные значения:

```js
  for(var k in schema){
    if(req.body[k] || req.query[k]) object[k] = (req.body[k] || req.query[k]);
    else object[k] = schema[k];
  }
```

И супер дикие костыли, за которые стыдно:

```js
    $('.block').append('<p>'+data[k].name+' '+data[k].surname+'<br><span class="sm">'+
    (function(){
      var res = '';
      for(var n in data[k].students){
        var rd = Math.floor(Math.random()*1000);
        res+='<script id="'+rd
        +'">$.get("/users/ob/'
        +data[k].students[n]
        +'", function(data){ var html = $("#'
        +rd+'").closest("span").html(); $("#'
        +rd+'").closest("span").html(html + " "+data.name+" "+data.surname); $("#'
        +rd+'").remove()  })</script>';
      }
      return res;
    })()
    +'</span></p>');
```
