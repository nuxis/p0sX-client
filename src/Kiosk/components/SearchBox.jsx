import React from 'react'
import { connect } from 'react-redux'
import { setSearchString, addItemToCart, openIngredientModalForItem } from '../actions'
import { getItemsByCategory, getSearch } from '../selectors'
import TextField from 'material-ui/TextField'

class SearchBox extends React.Component {
    static propTypes = {
        setSearchValue: React.PropTypes.func,
        shownItems: React.PropTypes.object,
        addItemToCart: React.PropTypes.func,
        searchValue: React.PropTypes.string
    }

    render () {
        const { searchValue } = this.props

        return (
            <TextField
                hintText='Search...'
                onKeyUp={this.keyPress}
                id='search'
                ref='search'
                underlineShow={false}
                style={{backgroundColor: '#FFF'}}
                value={searchValue}
                onChange={this.onChange}
            />
        )
    }

    onChange = (e) => {
        const { setSearchValue } = this.props
        setSearchValue(e.target.value)
    }

    keyPress = (e) => {
        const { setSearchValue, shownItems, addItemToCart } = this.props
        if (e.keyCode === 13) {
            const items = shownItems
            if (items.size === 1) {
                addItemToCart(items.get(0))
                setSearchValue('')
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        shownItems: getItemsByCategory(state),
        searchValue: getSearch(state)
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
