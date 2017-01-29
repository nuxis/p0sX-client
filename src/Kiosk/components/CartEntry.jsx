import React from 'react'
import { List } from 'immutable'
import {ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import {red500} from 'material-ui/styles/colors'

class CartEntry extends React.Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        ingredients: React.PropTypes.instanceOf(List).isRequired,
        onRemoveItem: React.PropTypes.func.isRequired,
        onEditItem: React.PropTypes.func.isRequired,
        image: React.PropTypes.string,
        index: React.PropTypes.number.isRequired,
        editable: React.PropTypes.bool.isRequired
    }

    removeItem = (e) => {
        const { onRemoveItem, index } = this.props
        e.stopPropagation()
        onRemoveItem(index)
    }

    editItem = () => {
        const {index, onEditItem} = this.props
        onEditItem(index)
    }

    render () {
        const { name, price, ingredients, image, editable } = this.props

        const textStyle = {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }

        return (
            <ListItem
                onTouchTap={this.editItem}
                leftAvatar={<Avatar src={image} />}
                primaryText={<div style={textStyle}>{name}</div>}
                secondaryText={(!ingredients.isEmpty() ? '+ingredients ' : '') + price + ',-'}
                secondaryTextLines={1}
                disabled={!editable}
                rightIconButton={<IconButton onClick={this.removeItem} disableTouchRipple><Delete color={red500} /></IconButton>}
            />
        )
    }
}

export default CartEntry
