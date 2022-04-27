const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());