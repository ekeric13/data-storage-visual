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
      this.setState({ items: ItemStore.getStoreItems(), parsedItems: ItemStore.getStoreParsedItems() });
    }
    console.log("got items from store", this.state.items, this.state.parsedItems);
  },

  render: function() {
    var nestedTableComp = (
      <NestedTable parsedItems={this.state.parsedItems} />
    );

    var dataTableComp = (
      <DataTable items={this.state.items} />
    );

    var treeMapComp = (
      <TreeMap parsedItems={this.state.parsedItems} />
      );
    return (
      <div className="item-container">
        <h2 className="header"> Item View </h2>
        <div className="row">
          <div className="nested-table-container col s5 m5 l5">
            {nestedTableComp}
          </div>
          <div className="data-table-container col offset-l1 offset-m1 s5 m5 l5">
            {dataTableComp}
          </div>
        </div>
        <div>
          {treeMapComp}
        </div>
      </div>
    )
  }
});

module.exports = ItemView;
