var alt = require('../alt');
var CategoryActions = require('../actions/CategoryActions');
var ItemActions = require('../actions/ItemActions');
var PosSource = require('../sources/PosSource');

class CategoryStore {
  constructor() {
    this.categories = [];
    this.errorMessage = null;

    this.bindListeners({
      handleUpdate: CategoryActions.update,
      handleFetch: CategoryActions.fetch,
      handleFailed: CategoryActions.failed
    });

    this.exportPublicMethods({
      getCategory: this.getCategory
    });

    console.log(PosSource);
    this.exportAsync(PosSource);
  }

  handleUpdate(categories) {
    categories.push({id: 0, name: "All"});
      
    this.categories = categories;
	
    this.errorMessage = null;
  }

  handleFetch() {
    this.categories = [];
  }

  handleFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  getCategory(id) {
    var { categories } = this.getState();
    for (var i = 0; i < categories.length; i += 1) {
      if (categories[i].id === id) {
        return categories[i];
      }
    }

    return null;
  }
}

module.exports = alt.createStore(CategoryStore, 'CategoryStore');