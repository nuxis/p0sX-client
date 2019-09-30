import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleIngredient, addCurrentItemToCart } from '../actions'
import { getCurrentItem, getIngredientModalOpen, getStrings } from '../selectors'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class IngredientCheckbox extends React.Component {
    static propTypes = {
        ingredient: PropTypes.object.isRequired,
        checked: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        strings: PropTypes.object.isRequired
    }

    click = (e) => {
        const { onClick, ingredient } = this.props
        e.stopPropagation()
        onClick(ingredient)
    }

    render () {
        const { ingredient, checked, strings } = this.props
        var price = ''
        if (ingredient.price !== 0) {
            price = ' '
            if (ingredient.price > 0) {
                price += '+'
            }
            price += ingredient.price + strings.price_short
        }

        const label = ingredient.name + price
        return (
            <RaisedButton
                style={{margin: '5px'}}
                primary={checked}
                onTouchTap={this.click}
                label={label}
            />
        )
    }
}

class IngredientModal extends React.Component {
    static propTypes = {
        currentItem: PropTypes.object,
        onClose: PropTypes.func,
        onIngredientClick: PropTypes.func,
        toggleOpen: PropTypes.any.isRequired,
        open: PropTypes.any,
        strings: PropTypes.object
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

        const price = currentItem.item.price + currentItem.ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
        const title = `${strings.select_ingredients} ${currentItem.item.name} | ${price} ${strings.price_text}`

        return (
            <Dialog autoScrollBodyContent actions={currentItem.edit ? editActions : addActions} modal onRequestClose={toggleOpen} open={open} title={title}>
                <div style={{display: 'flex', width: '100%', flexWrap: 'wrap', marginTop: '5px'}}>
                    {currentItem.item.ingredients.map(ingredient =>
                        <IngredientCheckbox
                            onClick={onIngredientClick}
                            ingredient={ingredient}
                            checked={currentItem.ingredients.includes(ingredient)}
                            key={ingredient.id}
                            strings={strings}
                        />
                    )}
                </div>
                <TextField
                    id='item-message'
                    ref='message'
                    hintText={strings.message}
                    defaultValue={currentItem.message}
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
