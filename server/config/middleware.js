var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var helpers = require('./helpers.js');

module.exports = function (app, express) {
  // Routers
  var itemRouter = express.Router();

  // General configs
  app.use(morgan('dev'));
  // Returns middleware that only parses urlencoded bodies
  // and parses extended syntax with qs module
  app.use(bodyParser.urlencoded({ extended: true }));
  // bodyParser.json() returns middleware that only parses json
  app.use(bodyParser.json());

  // Serves client-app
  // use express to serve statis assets
  app.use(express.static(__dirname + '/../../client'));

  // API router registrations
  app.use('/items', itemRouter);

  // Inject routers into respective route files
  require('../items/itemRoutes.js')(itemRouter);

  // API error handling
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // Wildcard route logic relegated to client
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/../../client/index.html'));
  });
};
