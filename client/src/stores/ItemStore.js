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
        else
            found_items = items;

        if (search.search_string != null) {
            for (var i = 0; i < items.length; i += 1) {
                if (items[i].name.indexOf(search.search_string) < 0)
                    found_items.splice(i, 1);
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
        var { items } = this.getState();
        for (var i = 0; i < items.length; i += 1) {
            if (items[i].id === id) {
                return items[i];
            }
        }

        return null;
    }
}

module.exports = alt.createStore(ItemStore, 'ItemStore');
