import CategoryActions from '../actions/CategoryActions';
import ItemActions from '../actions/ItemActions';
import fetch from 'node-fetch';

var PosSource = {
    fetchCategories() {
        return {
            remote() {
                return new Promise((resolve, reject) => {
                    fetch('http://127.0.0.1:8000/categories/?format=json')
                        .then((res) => {
                            if (res.ok)
                                return res.json();
                            else
                                reject("Failed to get categories from server!");
                        }).then((json) => {
                            resolve(json);
                        });
                });
            },

            local() {
                // Never check locally, always fetch remotely.
                return null;
            },

            success: CategoryActions.update,
            error: CategoryActions.failed,
            loading: CategoryActions.fetch 
        }
    },
    fetchItems() {
        return {
            remote() {
                return new Promise(function (resolve, reject) {
                    fetch('http://127.0.0.1:8000/items/?format=json')
                        .then(function (res) {
                            if (res.ok)
                                return res.json();
                            else {
                                reject("Failed to get items from server!");
                            }

                        }).then(function (json) {
                            resolve(json);
                        });
                });
            },

            local() {
                // Never check locally, always fetch remotely.
                return null;
            },

            success: ItemActions.set,
            error: ItemActions.failed,
            loading: ItemActions.fetch
        }
    }

};

module.exports = PosSource;
