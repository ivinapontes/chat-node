const express = require("express");
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }))


const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}

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
  console.log(messages);
  let id = message.id;
  console.log(id)
  id = welcomeMessage.length+1;
  // welcomeMessage.push(message);
  // response.status(201).json(welcomeMessage);
});


// app.delete("/quotes/:id", function )




app.listen(process.env.PORT);
