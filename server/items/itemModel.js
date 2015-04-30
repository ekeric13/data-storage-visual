var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// http://stackoverflow.com/questions/16514912/mongoose-schema-for-hierarchical-data-like-a-folder-subfolder-file
// http://docs.mongodb.org/manual/tutorial/model-tree-structures-with-child-references/

var ItemSchema = new Schema({
  name: { type: String, required: true },
  size: { type: Number }
});

module.exports = mongoose.model('items', ItemSchema)

// need to handle edge cases for inputting data. ex: currently spaces need to be exact

// alt schema
// var ItemSchema = new Schema({
//   name: { type: String, required: true },
//   size: { type: Number },
//   parent: {
//       type: Schema.Types.ObjectId,
//       ref: 'items'
//   },
//   children: [{
//       type: Schema.Types.ObjectId,
//       ref: 'items'
//   }]
// });
