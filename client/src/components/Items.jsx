var React = require('react');
var AltContainer = require('alt-container');
var ItemStore = require('../stores/ItemStore');
var ItemActions = require('../actions/ItemActions');
var CartActions = require('../actions/CartActions');
var classNames = require('classnames');

class AllItems extends React.Component {
    clicked(ev) {
        var item = ItemStore.getItem(ev.target.getAttribute('data-id'));
 
        CartActions.add(item);
    }
    
    render() {
        if (this.props.errorMessage) {
            return (
                <div>{this.props.errorMessage}</div>
            );
        }

        if (ItemStore.isLoading()) {
            return (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            );
        }

        return (
            <div>
            {this.props.displayed_items.map((item, i) => {
              return (
               <div className="item-card waves-effect waves-green z-depth-1 hoverable" key={i} data-id={item.id} onClick={this.clicked}>
                   <div className="card-image">
                     <img src="http://placehold.it/150x150" data-id={item.id} />
                   </div>
                   <div className="name-truncate">{item.name}</div>
                   <span className="right grey-text">{item.price} Kr.</span>
                   <br />
                   Stock: {item.stock} left
               </div>
             );
           })}
         </div>
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