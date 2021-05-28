//@ dot environment variable
require('dotenv').config({ path: './app/config/.env' });

//@ REQUIRE PACKAGE
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// APP
const app = express();

//@MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

//@ USE ROUTER
app.use('/', require('./app/routers/user.routes'));
app.use('/', require('./app/routers/ticket.routes'));

// INCLUDE CONNECTION
require('./app/config/connection/Connection');

//@ CREATE PORT
const PORT = process.env.PORT || 5000;

//@ RUN SERVER
app.listen(PORT, () => console.log(`server running at on port ${PORT}`));
