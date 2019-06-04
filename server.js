const express = require("express");
const cors = require('cors');
const { check } = require('express-validator/check');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }))


const welcomeMessage = require("./messages.json");

const messages = welcomeMessage
let nextIndex = messages.length;

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
  message.id = nextIndex++;
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
  let id = parseInt(req.params.id);  
  var indexToDelete = welcomeMessage.findIndex(item => id === item.id);
  if (indexToDelete>=0){
    welcomeMessage.splice(indexToDelete, 1);
    res.sendStatus(204);   
  } else {  
    res.sendStatus(404);
  }
})

app.get("/message/search", function(request, response) {
  ///message/search?term=belly
  let term = request.query.term;  
  response.send(findingWords(term));
});

function findingWords(term){
  let loweredCasedWord = term.toLowerCase();
  return welcomeMessage.filter(message => message.text.toLowerCase().includes(loweredCasedWord));
}

app.get("/message/latest", function(request, response){
  response.json(messages.slice(messages.length-10, messages.length));
});

app.put('/message/edit/:id?', function (req,res){
  let id = parseInt(req.params.id);
  const newMessage = req.body;  
  const existingMessage = messages.find(r => r.id === id);
  if(existingMessage){     
    existingMessage.text = newMessage.text;
    existingMessage.from = newMessage.from;
    res.json(existingMessage).sendStatus(204);
  } else {  
  res.sendStatus(404);  
}
});


app.listen(process.env.PORT);
