const express = require("express");
const cors = require("cors");
const { validateMiddleware } = require('./hashcash');

const app = express();

app.use(express.json());
app.use(cors());

app.post("/counter", validateMiddleware, (request, response) => {
    return response.status(200).send();
});


module.exports = app;
