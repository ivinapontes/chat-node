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
  let message = request.body;
  let id = messages.id;
  id = messages.length+1;
  messages.push(message);
  response.status(201).json(messages);
});

app.get("/messages/:id?", function(request, response){
  let id = request.params.id;
  // console.log(id)
  let message = welcomeMessage.filter(message => message.id == id);
  
  response.json(message);
});


// app.delete("/messages/delete/:id?", function(request, response){
//   let selectedId = request.params.id;
//   console.log(selectedId)
//   response.json(messages)
//   let found = messages.find(message=>message.id == selectedId);
//     console.log(found);
  
//   if (found){
//     messages = messages.filter(message=>message.id != selectedId);
//     response.status(204).json(messages)  
//     } else {
//       response.status(404).json(messages)
//     }
// })
app.delete('/delete/:id?', function (req, res) {
  let id = req.params.id;
  
  var findMessageById = welcomeMessage.find(message => message.id == id);
  if (findMessageById){
    let filteredArray = welcomeMessage.filter(message => message.id != findMessageById);
    res.status(204).json(filteredArray)  
    console.log(filteredArray)
    } else {
      res.status(404).json(messages)
    }
  
 
})

app.listen(process.env.PORT);
