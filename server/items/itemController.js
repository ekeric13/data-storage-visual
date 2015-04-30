var Item = require('./itemModel');

module.exports = {

  allItems: function(req, res, next) {
    // sort in case person puts Apparel > T-shirt before Apparel
    Item.find({}).sort({name: 1}).exec(function(err, items) {
      if (err) {
        next(err);
      } else {
        var parsedItems = parser(items);
        res.send(parsedItems);
      }
    });
    function parser(items) {
      var tree = {};
      function databaseArrayToObjTree(itemsArray) {
        for (var i = 0; i < itemsArray.length; i++){
          var currentEntry = itemsArray[i];
          var currentEntryName = currentEntry.name;
          var currentEntrySize = currentEntry.size;
          var categories = currentEntryName.split(" > ");
          var root = tree;
          for (var j = 0; j < categories.length; j++ ) {
            var currentCategory = categories[j];
            if (!root.hasOwnProperty(currentCategory)) {
              var children = {}
              root[currentCategory] = {name: currentEntryName, size: currentEntrySize, children: children}
            }
            root = root[currentCategory].children
          }
        }
      }
      function objToArray(root) {
        var jsonArray = [];
        for (var node in root) {
          jsonArray.push(root[node]);
        }
        return jsonArray;
      }
      function deepObjToArray(root) {
        var array = objToArray(root);
        for (var i = 0; i < array.length; i++){
          var node = array[i];
          if (node.hasOwnProperty("children")) {
            node.children = deepObjToArray(node.children)
          }
        }
        return array;
      }
      databaseArrayToObjTree(items);
      var finalTree = deepObjToArray(tree);
      return finalTree;
    }
  },

  createItem: function(req, res, next) {
    var name = req.body.name;
    var size = req.body.size;

    Item.findOne({ name: name }, function(err, match) {
      if (err) { next(err); }
      else if (match) { res.send(match); }
      else {
        var newItem = { name: name, size: size};
        Item.create(newItem, function(err, item) {
          if (err) {
            next({ status: 500, message: 'Something went wrong on our end.' })
          } else {
            res.send(item);
          }
        });
      }
    });
  },

  findItem: function(req, res, next, itemId) {
    Item.findOne({ _id: itemId }, function(err, item) {
      if (item) {
        req.item = item;
        next();
      } else if (err) {
        next(err);
      } else {
        next({ status: 404, message: 'No item with that ID' });
      }
    });
  },

  showItem: function(req, res) {
    res.json(req.item);
  },

  editItem: function(req, res, next) {
    var newItem = { name: req.body.name, size: req.body.size, updatedAt: Date.now() };
    Item.findByIdAndUpdate(req.item._id, newItem, function(err, updatedItem) {
      err ? next(err) : res.send(updatedItem);
    });
  },

  deleteItem: function(req, res, next) {
    Item.findByIdAndRemove(req.item._id, function(err, result) {
      if (result) {
        res.status(500).send();
      } else {
        next({ status: 404, message: 'No item with that ID' });
      }
    });
  }

};
