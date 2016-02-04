var alt = require('../alt');

class ItemActions {

  search(s) {
      this.dispatch(s);
  }

  fetch() {
    this.dispatch();
  }

  failed(errorMessage) {
    this.dispatch(errorMessage);
  }
  
  set(categories) {
      this.dispatch(categories);
  }
}

var action = alt.createActions(ItemActions);

module.exports = action;
exports.default = action;