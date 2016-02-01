var alt = require('../alt');

class CategoryActions {
  updateCategories(categories) {
    this.dispatch(categories);
  }

  fetchCategories() {
    this.dispatch();
  }

  categoriesFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}

module.exports = alt.createActions(CategoryActions);