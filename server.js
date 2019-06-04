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
const messages = welcomeMessage
let nextIndex = 15;

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
  let id = req.params.id;  
  var findMessageByIdAndFilter = welcomeMessage.filter(message => message.id != id);
  res.json(findMessageByIdAndFilter)
})



// For this level your API must also allow a client to:

// Read only messages whose text contains a given substring: /messages/search?text=express
// Read only the most recent 10 messages: /messages/latest


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
  let existingMessage = messages.find(r => r.id === id);
  if(existingMessage){     
     orig.text = changes.text;
  orig.from = changes.from;
    res.json(newMessage);
  } else {  
  res.sendStatus(404);  
}
});

function updateMessage(orig, changes) {
  orig.text = changes.text;
  orig.from = changes.from;
}

// app.put("/recipes/:id", function(request, response) {
//   const id = parseInt(request.params.id);

//   const recipeSubmitted = request.body;
//   const existingRecipe = recipes.find(r => id === r.id);
//   if (existingRecipe) {
//     updateRecipeInPlace(existingRecipe, recipeSubmitted);
//     response.json(existingRecipe);
//   } else {
//     response.sendStatus(404);
//   }
// });



app.listen(process.env.PORT);
