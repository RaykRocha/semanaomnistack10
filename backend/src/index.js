const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const { SetupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

SetupWebsocket(server);

mongoose.connect('mongodb+srv://raykrocha:wasd123@cluster0-mjqie.mongodb.net/week10?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

app.use(cors());
app.use(express.json());
app.use(routes);

//MÉTODOS HTTP: GET, POST, PUT, DELETE
server.listen(3333);
