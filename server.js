const path = require('path');
const express = require('express');
const cores = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5001;
const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cores({
    origin: ['http://localhost:5001', 'http://localhost:3000'],
    credentials: true,
  })
);

const ideaRouter = require('./routes/ideas');
app.use('/api/ideas', ideaRouter);

app.listen(port, () => console.log(`Server listening on port:${port}`));
