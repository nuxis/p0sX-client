import CategoryActions from '../actions/CategoryActions';
import fetch from 'node-fetch';

var PosSource = {
    fetchCategories() {
        return {
            remote() {
                return new Promise(function (resolve, reject) {
                    fetch('http://127.0.0.1:8000/categories/?format=json')
                      .then(function(res) {
                          if(res.ok)
                              return res.json();
                          else
                              reject("Failed to get data from server!");
                      }).then(function(json) {
                          resolve(json);
                      });	  
                });
            },

            local() {
                // Never check locally, always fetch remotely.
                return null;
            },

            success: CategoryActions.updateCategories,
            error: CategoryActions.categoriesFailed,
            loading: CategoryActions.fetchCategories
        }
    },
    fetchItems() {
        return {
            remote() {
                return new Promise(function (resolve, reject) {
                    fetch('http://127.0.0.1:8000/items/?format=json')
                      .then(function(res) {
                          if(res.ok)
                              return res.json();
                          else
                              reject("Failed to get data from server!");
                      }).then(function(json) {
                          resolve(json);
                      });	  
                });
            },

            local() {
                // Never check locally, always fetch remotely.
                return null;
            },

            success: CategoryActions.updateCategories,
            error: CategoryActions.categoriesFailed,
            loading: CategoryActions.fetchCategories
        }
    }

};

module.exports = PosSource;