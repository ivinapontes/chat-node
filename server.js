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

app.get("/messages/:id?", function(request, response){
  const id = request.params.id;
  // console.log(id)
  const message = welcomeMessage.filter(message => message.id == id);
  
  response.json(message);
});


// app.delete("/messages/delete/:id?", function(request, response) {
  
  
//   response.send(messages);
// })
app.delete("/messages/delete/:id?", function(request, response){
  let selectedId = request.params.id;
  let found = messages.filter(message=>message.id == selectedId);
    console.log(found);
  
  if (found){
    messages = messages.find(message=>message.id != selectedId);
    response.status(204).json(messages)  
    } else {
      response.status(404).json(messages)
    }
})

app.listen(process.env.PORT);
