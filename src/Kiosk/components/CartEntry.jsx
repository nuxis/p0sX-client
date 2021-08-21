import React from 'react'
import PropTypes from 'prop-types'
import {ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import {red500} from 'material-ui/styles/colors'

class CartEntry extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        ingredients: PropTypes.array.isRequired,
        onRemoveItem: PropTypes.func.isRequired,
        onEditItem: PropTypes.func.isRequired,
        image: PropTypes.string,
        index: PropTypes.number.isRequired,
        editable: PropTypes.bool.isRequired,
        priceText: PropTypes.string.isRequired
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
        const { name, price, ingredients, image, editable, priceText } = this.props

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
                // eslint-disable-next-line camelcase
                secondaryText={(!ingredients.length === 0 ? '+ingredients ' : '') + price + priceText}
                secondaryTextLines={1}
                disabled={!editable}
                rightIconButton={<IconButton onClick={this.removeItem} disableTouchRipple><Delete color={red500} /></IconButton>}
            />
        )
    }
}

export default CartEntry
