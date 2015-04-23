var ctrlr = require('ctrlr');


module.exports = function(expressApp, config) {

    require('express-reverse')(expressApp);

    if (typeof config.endpoints !== 'object') {
        throw new Error('config.routes must be set to a valid route object map');
    }

    if (typeof config.controllers !== 'string') {
        throw new Error('config.controllers must be set to a valid directory path');
    }

    var controllers = ctrlr(config.controllers);
    for (var endpoint in config.endpoints) {
        var meta = config.endpoints[endpoint];

        var method = (meta.method || 'get').toLowerCase();
        var action = controllers(meta.action);
        var route = meta.path;

        expressApp[method](endpoint, route, action);
    }
};


