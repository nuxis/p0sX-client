var alt = require('../alt');
var CartActions = require('../actions/CartActions');
var PosSource = require('../sources/PosSource');

class CartStore {
    constructor() {
        this.items = [];
        this.errorMessage = null;

        this.bindListeners({ 
            handlePurchase: CartActions.purchase,
            handleAdd: CartActions.add,
            handleRemove: CartActions.remove,
            handleFailed: CartActions.failed,
            handleEmpty: CartActions.empty
        });

        this.exportPublicMethods({
            getItem: this.getItem
        });

        this.exportAsync(PosSource);
    }

    handlePurchase() {
       
    }
    
    handleEmpty() {
        this.items = [];
    }

    handleAdd(item) {
        var updated = false;
        this.items.forEach((i) => {
            if(i.id == item.id) {
                item.count += 1;
                this.emitChange();   
                updated = true
            }
        });
        
        if(!updated) {
            item.count = 1;
            this.items.push(item)
        }
    }

    handleRemove(id) {
        var items = this.items;
        for(var i = 0; i < items.length; i++) {
            if(items[i].id == id) {
                items[i].count -= 1;
                if(items[i].count == 0) {
                    items.splice(i, 1);
                }
                break;
            }
            
        }
        this.items = items;
        this.emitChange();
    }

    handleFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

    getItem(id) {
        var { items } = this.getState();
        for (var i = 0; i < items.length; i += 1) {
            if (items[i].id === id) {
                return items[i];
            }
        }

        return null;
    }
}

module.exports = alt.createStore(CartStore, 'CartStore');
