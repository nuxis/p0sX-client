var alt = require('../alt');
var ItemActions = require('../actions/ItemActions');
var PosSource = require('../sources/PosSource');
var CategoryStore = require('./CategoryStore');


class ItemStore {
    constructor() {
        this.all_items = [];
        this.displayed_items = [];
        this.search = null;
        this.errorMessage = null;

        this.bindListeners({
            handleSet: ItemActions.set,
            handleSearch: ItemActions.search,
            handleFetch: ItemActions.fetch,
            handleFailed: ItemActions.failed,
        });

        this.exportPublicMethods({
            getItem: this.getItem
        });

        this.exportAsync(PosSource);
    }

    handleSet(items) {
        this.all_items = items;
        this.displayed_items = items;
        this.errorMessage = null;
    }

    handleSearch(search) {
        var found_items = [];
        var items = this.all_items;
        if (search.category != null && search.category.id != 0) {
            for (var i = 0; i < items.length; i += 1) {
                if (items[i].category == search.category.id)
                    found_items.push(items[i]);
            }
        }
        else {
            items.forEach((item) => {
                found_items.push(item);
            })
        }
            
           
        if (search.search_string != null && search.search_string.length > 0) {
            for (var i = 0; i < found_items.length; i += 1) {
                if (found_items[i].name.toLowerCase().indexOf(search.search_string) < 0) {
                    found_items.splice(i, 1);
                    i--;
                }
            }
        }

        this.displayed_items = found_items;
        this.errorMessage = null;
    }

    handleFetch() {
        this.all_items = [];
        this.displayed_items = [];
    }

    handleFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

    getItem(id) {
        var { displayed_items } = this.getState();
        var i = null;
        displayed_items.forEach((item) => {
           if(item.id == id) {
               i = item;
           } 
        });

        return i;
    }
}

module.exports = alt.createStore(ItemStore, 'ItemStore');
