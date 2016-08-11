
var cb = function(callback){
  
  setTimeout(function(){console.log('Third')},3000);
  return callback();
}



function callBack1(){
  var flag = Date.now();
  while(Date.now()-flag < 1000){
  }
  console.log('First');
  return callBack2();
}

function callBack2(){
  var flag = Date.now();
  while(Date.now()-flag < 1000){
  }
  console.log('Second');
}

cb(callBack1);