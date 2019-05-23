const express = require("express");
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }))


const welcomeMessage = require("./messages.json");

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage]


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});


app.get("/messages", function(request, response){
  response.json(messages);
});

app.post("/messages", function(request, response){
  const message = request.body;
  let id = messages.id;
  id = messages.length+1;
  messages.push(message);
  response.status(201).json(messages);
});

/*
 const quote = request.body;
  console.log(quote);
  let id = quotes.id;
  id = quotes.length+1;
  quotes.push(quote);
  response.status(201).json(quotes);
// app.delete("/quotes/:id", function )
*/



app.listen(process.env.PORT);
