$(document).ready(function(){
  function start(){
    $.get('/curators/all', function(data){
      for(var k in data){
        if(data[k].students.length){
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
        }else{
          $('.block').append('<p>'+data[k].name+' '+data[k].surname+'</p>');
        }
      }
    });
  }
  start();
  $('form').on('submit', function(e){
    e.preventDefault();
    $.post('/curators/wt?'+$(this).serialize(), function(data){
      $("input").val("");
      $('.block').html('');
      start();
    })
  })
});
