var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var app = express();


// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());


app.get('/', function(req, res){

	res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/todo', function(req, res){
	
	fs.readFile('../todo.json', 'utf8', function (err, data) {
  	var toDoArray = data.split(',');  //Be careful if you are in a \r\n world...
  	// Your array contains ['ID', 'D11', ... ]
  	console.log(toDoArray);
  	var i =1;
	  	for(todo of toDoArray){
	  		 if(i == toDoArray.length){
	  		 	res.write("End of TO-DO List");
	  		 }else{
	  		 	res.write(i + ". " + todo + "\r\n");	
	  		 }
	  		 
	  		i++;	
	  	}

	  	res.end();
	})
})

app.post('/', function(req, res){

	console.log(req.body.todo);


	fs.appendFile('../todo.json', req.body.todo + ',', function(err) {
    if (err) {
    	console.log('Error in writing the content to the file');

     	res.end();
     	
	
    } else {
    	console.log('File successfully written!');
      res.writeHead(302, {
	  'Location': '/'
	  });
	  res.end();
	
    }
  })
});



app.listen(2222, function(){
	console.log('Listening on PORT: 2222');
})