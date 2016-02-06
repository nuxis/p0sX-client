var alt = require('../alt');

class CategoryActions {
    update(categories) {
        return categories
    }

    fetch() {
        return null
    }

    failed(errorMessage) {
        return errorMessage
    }

    clicked(category) {
        return category
    }
}

var action = alt.createActions(CategoryActions);

module.exports = action;
exports.default = action;