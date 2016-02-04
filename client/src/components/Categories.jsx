var React = require('react');
var AltContainer = require('alt/AltContainer');
var CategoryStore = require('../stores/CategoryStore');
var CategoryActions = require('../actions/CategoryActions');
var ItemActions = require('../actions/ItemActions');


class AllCategories extends React.Component {
  clicked(ev) {
    var category = CategoryStore.getCategory(
      Number(ev.target.getAttribute('data-id'))
    );
    var search = {
        category: category
    }
    ItemActions.search(search);
  }

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
            <li key={i} data-id={category.id} onClick={this.clicked}>
              {category.name}
            </li>
          );
        })}
      </ul>
    );
  }
};

class Categories extends React.Component {
  componentDidMount() {
    CategoryStore.fetchCategories();
  }

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
};

module.exports = Categories;