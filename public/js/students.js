$(document).ready(function(){
  function start(){
    $.get('/users/all', function(data){
      for(var k in data){
        $('.block').append('<p>'+data[k].name+' '+data[k].surname+'</p>')
      }
    });
  }
  start();
  $('form').on('submit', function(e){
    e.preventDefault();
    $.post('/users/wt?'+$(this).serialize(), function(data){
      $("input").val("");
      $('.block').html('');
      start();
    })
  })
});
