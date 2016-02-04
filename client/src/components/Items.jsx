var React = require('react');
var AltContainer = require('alt-container');
var ItemStore = require('../stores/ItemStore');
var ItemActions = require('../actions/ItemActions');


class AllItems extends React.Component {
  render() {
    return (
      <ul>
        {this.props.displayed_items.map((item, i) => {
          return (
            <li key={i} data-id={item.id}>
              {item.name}
            </li>
          );
        })}
      </ul>
    );
  }
}; 

class Items extends React.Component {
  componentDidMount() {
    ItemStore.fetchItems();
  }

  render() {
    return (
      <div>
        <h4>Items</h4>
        <AltContainer store={ItemStore}>
          <AllItems />
        </AltContainer>
      </div>
    );
  }
};

module.exports = Items;