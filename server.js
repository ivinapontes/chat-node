const express = require("express");
const cors = require('cors');
const { check } = require('express-validator/check');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }))


const welcomeMessage = require("./messages.json");

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage]

//HomePage
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

//See all the messages
app.get("/messages", function(request, response){
  response.json(messages);
});

//Post messages
app.post("/messages", function(request, response){
  let message = request.body;
  let id = messages.id;
  id = messages.length+1;
  if (!message.text || !message.from){
    response.status(400).send('missing text or name')
    } else {
    messages.push(message);
    response.status(201).json(messages); 
  }
});

//Get message by X id
app.get("/messages/:id?", function(request, response){
  let id = request.params.id;
  let message = welcomeMessage.filter(message => message.id == id);
  response.json(message);
});

//"Delete" message by Id
app.delete("/delete/:id?", function (req, res) {
  let id = req.params.id;  
  var findMessageByIdAndFilter = welcomeMessage.filter(message => message.id != id);
  res.json(findMessageByIdAndFilter)
})







app.listen(process.env.PORT);
