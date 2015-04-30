var React = require("react");
var Reflux = require("reflux");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var ItemStore = require("../../stores/ItemStore");
var ItemActions = require("../../actions/ItemActions");
var NestedTable = require("./ItemViewComponents/NestedTable");
var DataTable = require("./ItemViewComponents/DataTable");
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
      this.setState({ items: ItemStore.getStoreItems(), parsedItems: ItemStore.getStoreParsedItems()});
    }
    console.log("got items from store", this.state.items, this.state.parsedItems);
  },

  render: function() {
    var nestedTableComp;
    var dataTableComp;
    var treeMapComp;
    var currentParsedItems = this.state.parsedItems;
    var currentItems = this.state.items;
    console.log("render graphs",currentParsedItems.length > 0, currentParsedItems);
    if (currentParsedItems.length > 0) {
      console.log("not suppose to be here");
      nestedTableComp = (
        <NestedTable parsedItems={currentParsedItems} />
      );
      treeMapComp = (
        <TreeMap parsedItems={currentParsedItems} />
        );
    }
    if (currentItems.length > 0) {
      dataTableComp = (
        <DataTable items={currentItems} />
      );
    }
    console.log("comps",nestedTableComp, treeMapComp);

    return (
      <div className="item-container">
        <h2 className="header"> Item View </h2>
        <div className="nested-table-container">
          {nestedTableComp}
        </div>
        <div className="data-table-container">
          {dataTableComp}
        </div>
        <div>
          {treeMapComp}
        </div>
      </div>
    )
  }
});

module.exports = ItemView;
