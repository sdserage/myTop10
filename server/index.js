require('dotenv').config()
const express = require('express');
const schema = require('./schema');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({ schema });
const app = express();
// allow cross-origin requests
app.use(cors());

server.applyMiddleware({ app });

// mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true });
// mongoose.connection.once('open', () => {
//   console.log('connected to database');
// });


// app.get("/home", (req, res) => res.status(200).send("<head><style>html{font-family: sans-serif}</style></head><body><h1>TEST</h1></body>"))


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
})