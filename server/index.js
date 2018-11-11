require('dotenv').config()
const express = require('express');
const schema = require('./graphqlSchema');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');

// Replace mongoose's promises with ES6's promises (not sure if this is needed or not)
mongoose.Promise = global.Promise;
// Set port number
const PORT = process.env.PORT || 3001;
// Create ApolloServer
const server = new ApolloServer({ schema });
// Create app
const app = express();
// allow cross-origin requests
app.use(cors());
// Connect ApolloServer to the app
server.applyMiddleware({ app });

mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('Connected to database.');
}).on('error', error => {
  console.log('Connecition Error: ', error);
});

// mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true });
// mongoose.connection.once('open', () => {
//   console.log('connected to database');
// });


// app.get("/home", (req, res) => res.status(200).send("<head><style>html{font-family: sans-serif}</style></head><body><h1>TEST</h1></body>"))


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
})