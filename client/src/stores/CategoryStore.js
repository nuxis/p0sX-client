var alt = require('../alt');
var CategoryActions = require('../actions/CategoryActions');
var PosSource = require('../sources/PosSource');

class CategoryStore {
  constructor() {
    this.categories = [];
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateCategories: CategoryActions.updateCategories,
      handleFetchCategories: CategoryActions.fetchCategories,
      handleCategoriesFailed: CategoryActions.categoriesFailed,
    });

    this.exportPublicMethods({
      getCategory: this.getCategory
    });

    console.log(PosSource);
    this.exportAsync(PosSource);
  }

  handleUpdateCategories(categories) {
    this.categories = categories;
	
    this.errorMessage = null;
  }

  handleFetchCategories() {
    this.categories = [];
  }

  handleCategoriesFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  getCategory(id) {
    var categories = this.getState();
    for (var i = 0; i < categories.length; i += 1) {
      if (categories[i].id === id) {
        return categories[i];
      }
    }

    return null;
  }
}

module.exports = alt.createStore(CategoryStore, 'CategoryStore');