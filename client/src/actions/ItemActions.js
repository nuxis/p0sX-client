var alt = require('../alt');

class ItemActions {

    search(s) {
        return s;
    }

    fetch() {
        return null;
    }

    failed(errorMessage) {
        return errorMessage;
    }

    set(categories) {
        return categories
    }
}

var action = alt.createActions(ItemActions);

module.exports = action;
exports.default = action;