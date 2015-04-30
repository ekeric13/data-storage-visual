var React = require("react");
var Router = require('react-router');
var App = require("./components/App");
var ItemView = require("./components/ItemView/ItemView");
var NotFoundView = require("./components/NotFoundView/NotFoundView");

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

// var injectTapEventPlugin = require("react-tap-event-plugin");
// injectTapEventPlugin();

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="itemsView" path="/" handler={ItemView} />
    <NotFoundRoute handler={NotFoundView} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('main'));
});
