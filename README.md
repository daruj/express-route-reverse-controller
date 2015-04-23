## express-route-controller

This is a helper function to assign controller actions to routes
in [express](http://expressjs.com/).

It provides just a tiny bit of structure on top of a normal express app, but also
doesn't get in the way at all, and you can continue to use express normally and
define even more routes manually if you wish.

### Usage:

In your express project install express-route-reverse-controller:

```
npm install express-route-reverse-controller
```

Now create a folder where you want all your controllers, eg. `controllers`, and add a file in there,
named (for example) `usersController.js`. Then define it somehow, like so:

```javascript
module.exports = {
    fetch: function(req, res) {
    },
    save: function(req, res) {
    },
    get: function(req, res) {
    }
};
```

In your main app.js file (or wherever you set up express routes normally) simply call the helper
function (very sparse demo express app):

```javascript
var express = require('express');
var app = express();
var errc = require('express-route-reverse-controller');

// set up express route control:
errc(app, {
    controllers: __dirname + '/controllers',
    endpoints: {
        'fetch_users': { path: '/fetch_users', method: 'get', action: 'usersController#fetch'},
        'save_users': { path: '/save_users', method: 'post', action: 'usersController#save'},
        'get_user': { path: '/get_user/:id', method: 'get', action: 'usersController#get'}
    }
});

app.listen(3000);
```

You can make this even more easier, by defining your routes in a `routes.json` file, like so:
```json
{
    'fetch_users': { path: '/fetch_users', method: 'get', action: 'usersController#fetch'},
    'save_users': { path: '/save_users', method: 'post', action: 'usersController#save'},
    'get_user': { path: '/get_user/:id', method: 'get', action: 'usersController#get'}
}
```

And loading the routes is as simple as:

```javascript
...

errc(app, {
    controllers: __dirname + '/controllers',
    endpoints: require('routes.json')
});

...
```

### From the view

```html
<a href="<%= url('fetch_users') %>">Fetch Users</a>
<a href="<%= url('get_user', {id: 1234214}) %>">Get User Id 1234214</a>