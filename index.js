var ctrlr = require('ctrlr');


module.exports = function(expressApp, config) {

    require('express-reverse')(expressApp);

    if (typeof config.routes !== 'object') {
        throw new Error('config.routes must be set to a valid route object map');
    }

    if (typeof config.controllers !== 'string') {
        throw new Error('config.controllers must be set to a valid directory path');
    }

    var controllers = ctrlr(config.controllers);
    for (var route in config.routes) {
        var meta = config.routes[route];

        if (typeof meta === 'string') {
            meta = { action: meta };
        }

        var name   = meta.name || '';
        var method = (meta.method || 'get').toLowerCase();
        var action = controllers(meta.action);


        expressApp[method](name, route, action);
    }
};


