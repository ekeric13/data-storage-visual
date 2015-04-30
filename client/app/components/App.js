var React = require("react");
var Router = require('react-router');
var PageNav = require("./PageNav");
var RouteHandler = Router.RouteHandler;

var App = React.createClass({

  render: function() {

    return (
      <div>
        <PageNav />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
