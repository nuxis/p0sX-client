var React = require('react');
var AltContainer = require('alt-container');
var CategoryStore = require('../stores/CategoryStore');
var CategoryActions = require('../actions/CategoryActions');
var ItemActions = require('../actions/ItemActions');
var classNames = require('classnames');

var Category = React.createClass({
  clicked(ev) {
    var search = {
        category: CategoryStore.getCategory(this.props.id)
    }
    ItemActions.search(search);
  },
    
  render() {
    let categoryClass = classNames({
      'collection-item': true,
      'active': this.props.active
    });
    return(
      <a className={categoryClass} key={this.props.key} data-id={this.props.id} onClick={this.clicked}>
        {this.props.name}
      </a>
    );
  }
});

class AllCategories extends React.Component {  
  renderCategory(category, active) {
      return(
          <Category name={category.name} id={category.id} active={category.active} key={category.id} />
      );
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

    var items = this.props.categories.map(this.renderCategory);
    return (
      <div className="collection">
        {items}
      </div>
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
        <h4>Categories</h4>
        <AltContainer store={CategoryStore}>
          <AllCategories />
        </AltContainer>
      </div>
    );
  }
};

module.exports = Categories;