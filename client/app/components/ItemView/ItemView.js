var React = require("react");
var Reflux = require("reflux");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var ItemStore = require("../../stores/ItemStore");
var ItemActions = require("../../actions/ItemActions");


var ItemView = React.createClass({

  mixins: [PureRenderMixin, Reflux.ListenerMixin],

  getInitialState: function () {
    return {
      items: ItemStore.getStoreItems()
    };
  },

  componentDidMount: function () {
    if (this.state.items.length === 0) {
      ItemActions.getAllItems();
    }
    this.listenTo(ItemStore, this.onStoreChange);
  },

  onStoreChange: function(){
    var self = this;
    if(this.isMounted()) {
      this.setState({ items: ItemStore.getStoreItems() });
    }
    console.log("got items from store", ItemStore.getStoreItems());
  },

  render: function() {
    return (
      <div className="item-container">
        <h2 className="header"> Item View </h2>
      </div>
    )
  }
});

module.exports = ItemView;
