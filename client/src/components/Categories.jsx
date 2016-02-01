var React = require('react');
var AltContainer = require('alt/AltContainer');
var CategoryStore = require('../stores/CategoryStore');
var CategoryActions = require('../actions/CategoryActions');


var AllCategories = React.createClass({

  render() {
    if (this.props.errorMessage) {
      return (
        <div>{this.props.errorMessage}</div>
      );
    }

    if (CategoryStore.isLoading()) {
      return (
        <div>
          <img src="spinner.gif" />
        </div>
      )
    }

    return (
      <ul>
        {this.props.categories.map((category, i) => {
          return (
            <li key={i}>
              {category.name}
            </li>
          );
        })}
      </ul>
    );
  }
});

var Categories = React.createClass({
  componentDidMount() {
    CategoryStore.fetchItems();
  },

  render() {
    return (
      <div>
        <h1>Categories</h1>
        <AltContainer store={CategoryStore}>
          <AllCategories />
        </AltContainer>
      </div>
    );
  }
});

module.exports = Categories;