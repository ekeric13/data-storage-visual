var itemController = require('./itemController');

module.exports = function(app) {
  app.param('itemId', itemController.findItem);

  app.route('/')
    .get(itemController.allItems)
    .post(itemController.createItem);

  app.route('/:itemId')
    .get(itemController.showItem)
    .put(itemController.editItem)
    .delete(itemController.deleteItem);

};

