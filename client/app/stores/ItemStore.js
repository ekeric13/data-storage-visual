var Reflux = require("reflux");
var ItemActions = require("../actions/ItemActions");

// var initialTree = [
//     {name: 'Apparel', size: 439501},
//     {name: 'Apparel > T-Shirts', size: 82393},
//     {name: 'Apparel > T-Shirts > James Franco', size: 12901},
//     {name: 'Apparel > T-Shirts > Neil deGrasse Tyson', size: 10233},
//     {name: 'Apparel > T-Shirts > Stephen Amell', size: 39949},
//     {name: 'Apparel > T-Shirts > Will Ferrell', size: 1345},
//     {name: 'Art > Portraits', size: 90983},
//     {name: 'Art > Portraits > Song Birds', size: 1294},
//     {name: 'Art > Portraits > Art Deco Print', size: 7671}
// ];

// var treeParsed = [
//     {
//         "name": "App",
//         "size": 12354,
//         "children": []
//     },
//     {
//         "name": "Apparel",
//         "size": 43952,
//         "children": [
//             {
//                 "name": "Apparel > art",
//                 "size": 43952,
//                 "children": [
//                     {
//                         "name": "Apparel > art > house",
//                         "size": 43952,
//                         "children": []
//                     },
//                     {
//                         "name": "Apparel > art > t-shirt",
//                         "size": 43952,
//                         "children": []
//                     }
//                 ]
//             },
//             {
//                 "name": "Apparel > mouse",
//                 "size": 12354,
//                 "children": [
//                     {
//                         "name": "Apparel > mouse > cat",
//                         "size": 12354,
//                         "children": []
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         "name": "Art",
//         "size": 43952,
//         "children": []
//     }
// ];

// var staticDeployTuple = [initialTree, treeParsed];

var ItemStore = Reflux.createStore({

  listenables: ItemActions,

  _items: [],

  _itemsParsed: [],

  getStoreItems: function() {
    return this._items;
  },

  getStoreParsedItems: function() {
    return this._itemsParsed;
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
      // console.log("cheating workaround to not setup api endpoint");
      // this._items = staticDeployTuple[0];
      // this._itemsParsed = staticDeployTuple[1];
      // this.trigger();
      console.error(error);
    }.bind(this));
  }

});

module.exports = ItemStore;
