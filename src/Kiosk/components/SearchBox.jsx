import React from 'react'
import { connect } from 'react-redux'
import { setSearchString, addItemToCart, openIngredientModalForItem } from '../actions'
import { getItemsByCategory } from '../selectors'
import TextField from 'material-ui/TextField'
import SearchIcon from 'material-ui/svg-icons/action/search'

class SearchBox extends React.Component {
    static propTypes = {
        setSearchValue: React.PropTypes.func.isRequired,
        shownItems: React.PropTypes.object.isRequired,
        addItemToCart: React.PropTypes.func.isRequired
    }

    render () {
        return (
            <TextField
                hintText={<SearchIcon style={{width: '32px', height: '32px', opacity: '.5'}} />}
                hintStyle={{bottom: '2px'}}
                onKeyUp={this.keyPress}
                id='search'
                underlineShow={false}
            />
        )
    }

    keyPress = (e) => {
        const { setSearchValue, shownItems, addItemToCart } = this.props
        setSearchValue(e.target.value)
        if (e.keyCode === 13) {
            const items = shownItems
            if (items.size === 1) {
                addItemToCart(items.get(0))
                setSearchValue('')
                $('#search').val('')
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        shownItems: getItemsByCategory(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchValue: (value) => {
            dispatch(setSearchString(value))
        },
        addItemToCart: (item) => {
            if (item.get('created_in_the_kitchen')) {
                dispatch(openIngredientModalForItem(item))
            } else {
                dispatch(addItemToCart(item))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBox)
