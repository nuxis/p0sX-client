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

    this.exportAsync(PosSource);
  }

  handleUpdate(categories) {
    
    for(var i = 0; i < categories.length; i++) {
        categories[i].active = false;
    }
    
    categories.unshift({id: 0, name: "All", active: true});
    
    
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
    var category = null;
    for (var i = 0; i < categories.length; i += 1) {
      if (categories[i].id === id) {
        categories[i].active = true;
        category = categories[i];
      }
      else {
        categories[i].active = false;
      }
    }
    this.state.categories = categories;
    this.emitChange();
    return category;
  }
}

module.exports = alt.createStore(CategoryStore, 'CategoryStore');