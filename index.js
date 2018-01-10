const express = require('express');
const path = require('path');
const logger = require('morgan');

const auth = require('./middleware/auth');

const mainRouter = require('./routers/main');
const adminRouter = require('./routers/admin');
const numberRouter = require('./routers/number');
const customerRouter = require('./routers/customer');
const directionRouter = require('./routers/direction');
const tariffRouter  =require('./routers/tariffs');

const server = express();

server.use(express.static(path.join(__dirname, 'public')));

server.use(logger('dev'));

server.use('/', mainRouter);

//server.use(auth);

server.use('/admin', adminRouter);
server.use('/numbers', numberRouter);
server.use('/customers', customerRouter);
server.use('/directions', directionRouter);
server.use('/tariffs', tariffRouter);


server.listen(3000, () => console.log('Express..', 3000));