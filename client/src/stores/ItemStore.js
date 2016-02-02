var alt = require('../alt');
var ItemActions = require('../actions/ItemActions');
var ItemSource = require('../sources/ItemSource');

class ItemStore {
    constructor() {
        this.all_items = [];
        this.displayed_items = [];
        this.errorMessage = null;

        this.bindListeners({
            handleSetItems: ItemActions.setItems,
            handleUpdateItems: ItemActions.updateItems,
            handleFetchItems: ItemActions.fetchItems,
            handleItemsFailed: ItemActions.itemsFailed,
        });

        this.exportPublicMethods({
            getCategory: this.getCategory
        });

        this.exportAsync(ItemSource);
    }

    handleSetItems(items) {
        this.all_items = items;
        this.displayed_items = items;
        this.errorMessage = null;
    }

    handleUpdateItems(category, search_string) {
        var found_items = [];
        var items = this.all_items;
        if (category != null) {
            for (var i = 0; i < items.length; i += 1) {
                if (items[i].category == category)
                    found_items.push(items[i]);
            }
        }
        else
            found_items = items;

        if (search_string != null) {
            for (var i = 0; i < items.length; i += 1) {
                if (items[i].name.indexOf(search_string) < 0)
                    found_items.splice(i, 1);
            }
        }

        this.displayed_items = items;
        this.errorMessage = null;
    }

    handleFetchItems() {
        this.all_items = [];
        this.displayed_items = [];
    }

    handleItemsFailed(errorMessage) {
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
