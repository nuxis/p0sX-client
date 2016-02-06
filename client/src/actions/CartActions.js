var alt = require('../alt');

class CartActions {

    purchase() {
        return null;
    }

    add(item) {
        return item;
    }

    remove(item) {
        return item;
    }
    
    empty() {
        return null;
    }

    failed(errorMessage) {
        return errorMessage;
    }
}

var action = alt.createActions(CartActions);

module.exports = action;
exports.default = action;