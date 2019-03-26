require('dotenv').load();
const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');

const config = require('./config');
const { error } = require('./middleware');
const auth = require('./middleware/auth');

const routers = require('./routers');

const app = express();

app.set('config', config);

app.set('views', config.paths.views);
app.set('view engine', 'pug');

app.locals.version = config.version;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(config.paths.lib));
app.use('/favicon', express.static(config.paths.favicon));

app.use(logger('dev'));

app.use('/', routers.main);
//app.use(auth);
app.use('/admin', routers.admin);
app.use('/numbers', routers.number);
app.use('/customers', routers.customer);
app.use('/directions', routers.direction);
app.use('/tariffs', routers.tariff);

app.use('/xxx', routers.x_number);

const x_models = require('./sql/x_models')

app.use(error.notFound);
app.use(app.get('env') === 'development' ? error.development : error.production);

app.listen(config.port, () => console.log('Express:', config.port));