import React from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { toggleIngredient, addCurrentItemToCart } from '../actions'
import { getCurrentItem, getIngredientModalOpen, getStrings } from '../selectors'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'

class IngredientCheckbox extends React.Component {
    static propTypes = {
        ingredient: React.PropTypes.object,
        checked: React.PropTypes.bool.isRequired,
        onClick: React.PropTypes.func.isRequired
    }

    static noop (e) {
        e.stopPropagation()
    }

    click = (e) => {
        const { onClick, ingredient } = this.props
        e.stopPropagation()
        onClick(ingredient)
    }

    render () {
        const { ingredient, checked } = this.props

        return (
            <ListItem
                onClick={this.click}
                primaryText={ingredient.get('name') + ' ' + ingredient.get('price') + ',-'}
                leftCheckbox={<Checkbox onClick={IngredientCheckbox.noop} checked={checked} />}
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

        const title = strings.select_ingredients + ' ' + currentItem.get('item').get('name')

        return (
            <Dialog autoScrollBodyContent actions={currentItem.get('edit') ? editActions : addActions} modal onRequestClose={toggleOpen} open={open} title={title}>
                <List>
                    {currentItem.get('item').get('ingredients').map(ingredient =>
                        [
                            <Divider />,
                            <IngredientCheckbox
                                onClick={onIngredientClick}
                                ingredient={ingredient}
                                checked={currentItem.get('ingredients').includes(ingredient)}
                                key={ingredient.get('id')}
                            />
                        ]
                    )}
                    <Divider />
                </List>
                <TextField
                    id='item-message'
                    ref='message'
                    hintText={strings.message}
                    defaultValue={currentItem.get('message')}
                    fullWidth
                    inputStyle={{marginTop: '0px'}}
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
