var ctrlr = require('ctrlr');
var fs = require('fs');

module.exports = function (expressApp, config) {

  require('express-reverse')(expressApp);

  if (typeof config.endpoints !== 'object') {
    throw new Error('config.routes must be set to a valid route object map');
  }

  if (typeof config.controllers !== 'string') {
    throw new Error('config.controllers must be set to a valid directory path');
  }

  if (typeof config.middlewares !== 'string') {
    throw new Error('config.middlewares must be set to a valid directory path');
  }

  // Obj of middlewares
  var mw = {};

  // Let's load all the files in models dir
  fs.readdirSync(config.middlewares).forEach(function (filename) {
    if (~filename.indexOf('.js')) {
      var filename = filename.split('.js')[0];
      mw[filename] = require(config.middlewares + '/' + filename + '.js');
    }
  });

  var endpoint;
  var controllers = ctrlr(config.controllers);

  for (endpoint in config.endpoints) {
    var meta = config.endpoints[endpoint];

    var method = (meta.method || 'get').toLowerCase();
    var action = controllers(meta.action);
    var route = meta.path;
    var routeMiddlewares = meta.middlewares || [];
    var middlewares = [mw.log, mw.getUser];

    if (routeMiddlewares.length) {
      routeMiddlewares.forEach(function (middleware) {
        middlewares.push(mw[middleware]);
      });
    }
    expressApp[method](endpoint, route, middlewares, action);
  }
};



