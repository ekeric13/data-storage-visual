var React = require("react");
var Reflux = require("reflux");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var ItemStore = require("../../stores/ItemStore");
var ItemActions = require("../../actions/ItemActions");
var TreeMap = require("./ItemViewComponents/TreeMap");


var ItemView = React.createClass({

  mixins: [PureRenderMixin, Reflux.ListenerMixin],

  getInitialState: function () {
    return {
      items: ItemStore.getStoreItems(),
      parsedItems: ItemStore.getStoreParsedItems()
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
      this.setState({ items: ItemStore.getStoreItems(), parsedItems: ItemStore.getStoreParsedItems() });
    }
    console.log("got items from store", ItemStore.getStoreItems());
  },

  render: function() {
    var treeMapComp = (
      <TreeMap parsedItems={this.state.parsedItems} />
      );
    return (
      <div className="item-container">
        <h2 className="header"> Item View </h2>
        <div>
          {treeMapComp}
        </div>
      </div>
    )
  }
});

module.exports = ItemView;
