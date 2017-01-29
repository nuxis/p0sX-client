import React from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { toggleIngredient, addCurrentItemToCart } from '../actions'
import { getCurrentItem, getIngredientModalOpen } from '../selectors'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'

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
        console.log('clicked...')
    }

    render () {
        const { ingredient, checked } = this.props

        const style = {
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft: '50px'
        }

        return (
            <ListItem
                style={style}
                onClick={this.click}
                primaryText={ingredient.get('name') + ' ' + ingredient.get('price') + ',-'}
                leftCheckbox={<Checkbox style={{top: '4px'}} onClick={IngredientCheckbox.noop} checked={checked} />}
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
        open: React.PropTypes.any
    }

    close = () => {
        const { onClose, currentItem } = this.props
        onClose(currentItem)
    }

    render () {
        const { currentItem, onIngredientClick, open, toggleOpen } = this.props

        const editActions = [
            <FlatButton
                label='save'
                primary
                onTouchTap={this.close}
            />
        ]

        const addActions = [
            <FlatButton
                label='Cancel'
                primary
                onTouchTap={toggleOpen}
            />,
            <FlatButton
                label='Add to cart'
                primary
                keyboardFocused
                onTouchTap={this.close}
            />
        ]

        return (
            <Dialog bodyStyle={{paddingBottom: '0px'}} autoScrollBodyContent actions={currentItem.get('edit') ? editActions : addActions} modal onRequestClose={toggleOpen} open={open} title={'Options for ' + currentItem.get('item').get('name')}>
                <List>
                    {currentItem.get('item').get('ingredients').map(ingredient =>
                        <IngredientCheckbox
                            onClick={onIngredientClick}
                            ingredient={ingredient}
                            checked={currentItem.get('ingredients').includes(ingredient)}
                            key={ingredient.get('id')}
                        />
                    )}
                </List>
                <TextField
                    id='item-message'
                    hintText='Message'
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
        open: getIngredientModalOpen(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: (currentItem) => {
            dispatch(addCurrentItemToCart(currentItem, $('#item-message').val()))
            $('#item-message').val('')
        },
        onIngredientClick: (ingredient) => {
            dispatch(toggleIngredient(ingredient))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientModal)
