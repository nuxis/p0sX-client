import React from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { toggleIngredient, addCurrentItemToCart } from '../actions'
import { getCurrentItem, getIngredientModalOpen, getStrings } from '../selectors'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class IngredientCheckbox extends React.Component {
    static propTypes = {
        ingredient: React.PropTypes.object.isRequired,
        checked: React.PropTypes.bool.isRequired,
        onClick: React.PropTypes.func.isRequired,
        strings: React.PropTypes.object.isRequired
    }

    click = (e) => {
        const { onClick, ingredient } = this.props
        e.stopPropagation()
        onClick(ingredient)
    }

    render () {
        const { ingredient, checked, strings } = this.props

        return (
            <RaisedButton
                style={{margin: '5px'}}
                primary={checked}
                onTouchTap={this.click}
                label={ingredient.get('name') + ' ' + ingredient.get('price') + ' ' + strings.price_text}
            />
        )
    }
}

class IngredientModal extends React.Component {
    static propTypes = {
        currentItem: React.PropTypes.instanceOf(Map),
        onClose: React.PropTypes.func,
        onIngredientClick: React.PropTypes.func,
        toggleOpen: React.PropTypes.any.isRequired,
        open: React.PropTypes.any,
        strings: React.PropTypes.object
    }

    close = () => {
        const { onClose, currentItem } = this.props
        const message = this.refs.message.getValue()
        onClose(currentItem, message)
    }

    render () {
        const { currentItem, onIngredientClick, open, toggleOpen, strings } = this.props

        const editActions = [
            <FlatButton
                label={strings.save}
                primary
                onTouchTap={this.close}
            />
        ]

        const addActions = [
            <FlatButton
                label={strings.cancel}
                primary
                onTouchTap={toggleOpen}
            />,
            <FlatButton
                label={strings.add_to_cart}
                primary
                keyboardFocused
                onTouchTap={this.close}
            />
        ]

        const price = currentItem.get('item').get('price') + currentItem.get('ingredients').reduce((sum, ingredient) => sum + ingredient.get('price'), 0)
        const title = `${strings.select_ingredients} ${currentItem.get('item').get('name')} - ${price} ${strings.price_text}`

        return (
            <Dialog autoScrollBodyContent actions={currentItem.get('edit') ? editActions : addActions} modal onRequestClose={toggleOpen} open={open} title={title}>
                <div style={{display: 'flex', width: '100%', flexWrap: 'wrap', marginTop: '5px'}}>
                    {currentItem.get('item').get('ingredients').map(ingredient =>
                        <IngredientCheckbox
                            onClick={onIngredientClick}
                            ingredient={ingredient}
                            checked={currentItem.get('ingredients').includes(ingredient)}
                            key={ingredient.get('id')}
                            strings={strings}
                        />
                    )}
                </div>
                <TextField
                    id='item-message'
                    ref='message'
                    hintText={strings.message}
                    defaultValue={currentItem.get('message')}
                    fullWidth
                    style={{marginTop: '15px'}}
                    multiLine
                    rowsMax={5}
                />
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentItem: getCurrentItem(state),
        open: getIngredientModalOpen(state),
        strings: getStrings(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: (currentItem, message) => {
            dispatch(addCurrentItemToCart(currentItem, message))
        },
        onIngredientClick: (ingredient) => {
            dispatch(toggleIngredient(ingredient))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientModal)
