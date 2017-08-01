import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setSearchString, addItemToCart, openIngredientModalForItem } from '../actions'
import { getItemsByCategory, getSearch, getStrings } from '../selectors'
import TextField from 'material-ui/TextField'

class SearchBox extends React.Component {
    static propTypes = {
        setSearchValue: PropTypes.func,
        shownItems: PropTypes.array,
        addItemToCart: PropTypes.func,
        searchValue: PropTypes.string,
        strings: PropTypes.object
    }

    render () {
        const { searchValue, strings } = this.props

        return (
            <TextField
                hintText={strings.search}
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
            if (items.length === 1) {
                addItemToCart(items[0])
                setSearchValue('')
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        shownItems: getItemsByCategory(state),
        searchValue: getSearch(state),
        strings: getStrings(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchValue: (value) => {
            dispatch(setSearchString(value))
        },
        addItemToCart: (item) => {
            if (item.created_in_the_kitchen) {
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
