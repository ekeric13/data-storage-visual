var React = require("react");

var DataTable = React.createClass({

  propTypes: {
    items: React.PropTypes.array
  },

  componentDidMount: function() {
    var jsonArray = this.props.items;
    $("#itemTable").dataTable( {
        "data": jsonArray,
        "columns": [
            { "data": "name" },
            { "data": "size" }
        ],

    } );
  },

  componentDidUpdate: function() {
    var jsonArray = this.props.items;
    $("#itemTable").dataTable( {
        "data": jsonArray,
        "columns": [
            { "data": "name" },
            { "data": "size" }
        ],

    } );
  },



  render: function(){
    return (
      <div>
        <h4> DataTable </h4>
        <table id="itemTable" className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    )
  }

});

module.exports = DataTable;
