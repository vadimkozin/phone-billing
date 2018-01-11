const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');

const config = require('./config');
const { error } = require('./middleware');

const routers = require('./routers');

const auth = require('./middleware/auth');

const mainRouter = require('./routers/main');
const adminRouter = require('./routers/admin');
const numberRouter = require('./routers/number');
const customerRouter = require('./routers/customer');
const directionRouter = require('./routers/direction');
const tariffRouter  =require('./routers/tariffs');

const app = express();

app.set('view engine', 'pug');
app.set('views', config.paths.views);
app.set('config', config);

app.locals.version = config.version;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(config.paths.lib));
app.use('/favicon', express.static(config.paths.favicon));

app.use(logger('dev'));

//app.use('/', mainRouter);

//app.use(auth);

app.use('/admin', adminRouter);
//app.use('/numbers', numberRouter);
//app.use('/customers', customerRouter);
//app.use('/directions', directionRouter);
//app.use('/tariffs', tariffRouter);

app.use('/', routers.x_main);
app.use('/numbers', routers.x_number);
app.use('/customers', routers.x_customer);
app.use('/directions', routers.x_direction);
app.use('/tariffs', routers.x_tariff);

app.use(error.notFound);
app.use(app.get('env') === 'development' ? error.development : error.production);

app.listen(3000, () => console.log('Express..', 3000));