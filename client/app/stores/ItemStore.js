var Reflux = require("reflux");
var ItemActions = require("../actions/ItemActions");

var ItemStore = Reflux.createStore({

  listenables: ItemActions,

  _items: [],

  _itemsParsed: [],

  getStoreItems: function() {
    return this._items;
  },

  getStoreParsedItems: function() {
    return this._items;
  },

  getAllItems: function() {
    console.log("start ajax");
    $.ajax({
      type: 'GET',
      url: '/items'
    })
    .done(function (itemsTuple) {
      console.log("finished ajax", itemsTuple);
      this._items = itemsTuple[0];
      this._itemsParsed = itemsTuple[1];
      // broadcast that items has changed
      this.trigger();
    }.bind(this))
    .fail(function(error) {
      console.error(error);
    });
  }

});

module.exports = ItemStore;
