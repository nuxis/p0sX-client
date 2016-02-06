var React = require('react');
var AltContainer = require('alt-container');
var CartStore = require('../stores/CartStore');
var CartActions = require('../actions/CartActions');
var classNames = require('classnames');

class CartList extends React.Component {
    remove(ev) {
        CartActions.remove(Number(ev.target.getAttribute('data-id')));
    }
    
    render() {
        if (this.props.errorMessage) {
            return (
                <div>{this.props.errorMessage}</div>
            );
        }
        
        if(this.props.items.length == 0) {
            return (
                <div>Click on items to add them to the cart.</div>
            );
        }

        return (
            <ul className="collection">
            {this.props.items.map((item, i) => {
              return (
               <li className="collection-item avatar" key={i} data-id={item.id}>
                   <img src="http://placehold.it/150x150" alt="" className="circle" />
                   <span className="title">{item.name} x{item.count}</span>
                   <p>
                       {item.price * item.count} Kr.
                   </p>
                   <a href="#!" className="secondary-content" onClick={this.remove}><i data-id={item.id} className="material-icons small red-text">delete</i></a>
               </li>
              );
             })}
             </ul>
    );
    }
};

class Cart extends React.Component {
    empty(ev) {
        CartActions.empty();
    }
    
    render() {
        return (
          <div>
            <AltContainer store={CartStore}>
              <div className="row">
                  <h4>Cart &nbsp;
                  <a onClick={this.empty} title="Empty cart" className="btn-floating right waves-effect waves-light red"><i className="material-icons">delete</i></a>
                  </h4>
              </div>
              <CartList />
            </AltContainer>
          </div>
       );
    }
};

module.exports = Cart;