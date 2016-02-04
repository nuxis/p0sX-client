var React = require('react');
var AltContainer = require('alt/AltContainer');
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
        <h1>Items</h1>
        <AltContainer store={ItemStore}>
          <AllItems />
        </AltContainer>
      </div>
    );
  }
};

module.exports = Items;