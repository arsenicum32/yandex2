fs = require('fs');
function response(pathdb, schema){
  var path = pathdb;
  var schema = schema;
  return {
    all: function( req, res, next ){
      fs.readFile( path , 'utf8' , function(err, data){
        if(err){ res.json({error: 500});}else{
          res.json(JSON.parse(data));
        }
      });
    },
    getId: function(req, res, next){
      fs.readFile( path , 'utf8' , function(err, data){
        if(err){ res.json({error: 500});}else{
          var dt = JSON.parse(data);
          for(var i=0;i<dt.length;i++){
            if(i<dt.length-1){
              if(dt[i].id==req.params.id){res.json(dt[i]); return true; }
            }else{
              if(dt[i].id==req.params.id){res.json(dt[i]); return true; }else{ res.json({error: 404}); return true; }
            }
          }
        }
      });
    },
    upId: function(req, res, next){
      function write(data,index){
        var dat = data;
        for(var k in schema){
          if(req.body[k] || req.query[k]) dat[index][k] = (req.body[k] || req.query[k]);
        }
        fs.writeFile( path , JSON.stringify( dat , null, "\t" ) , 'utf8', function(err){
          err?res.json({error:500}):res.json({sup:true});
        });
      }
      fs.readFile( path , 'utf8' , function(err, data){
        if(err){ res.json({error: 500});}else{
          var dt = JSON.parse(data);
          for(var i=0;i<dt.length;i++){
            if(i<dt.length-1){
              if(dt[i].id==req.params.id){
                write(dt,i);
                return true;
              }
            }else{
              if(dt[i].id==req.params.id){
                write(dt,i);
                return true;
              }else{ res.json({error: 404}); return true; }
            }
          }
        }
      });
    },
    delD: function(req,res,next){
      function write(data,index){
        var dat = data.slice(index, 1);
        fs.writeFile( path , JSON.stringify( dat , null, "\t" ) , 'utf8', function(err){
          err?res.json({error:500}):res.json({sup:true});
        });
        return true;
      }
      fs.readFile( path , 'utf8' , function(err, data){
        if(err){ res.json({error: 500});}else{
          var dt = JSON.parse(data);
          for(var i=0;i<dt.length;i++){
            if(i<dt.length-1){
              if(dt[i].id==req.params.id){
                write(dt,i);
                break;
                return true;
              }
            }else{
              if(dt[i].id==req.params.id){
                write(dt,i);
                break;
                return true;
              }else{ res.json({error: 404}); return true; }
            }
          }
        }
      });
    },
    pushD: function(req, res, next){
      fs.readFile( path , 'utf8' , function(err, data){
        if(!err){
          var dt = JSON.parse(data);
          var object = {};
          for(var k in schema){
            if(req.body[k] || req.query[k]) object[k] = (req.body[k] || req.query[k]);
            else object[k] = schema[k];
          }
          object.id= dt.length + (new Date()).getTime();
          dt.push(object);
          fs.writeFile( path , JSON.stringify( dt , null, "\t" ) , 'utf8', function(err){
              err?res.json({error: 500}):res.json({id: object.id});
          });
        }else{
          res.json({error: 500});
        }
      });
    }
  }
}

module.exports = response;
