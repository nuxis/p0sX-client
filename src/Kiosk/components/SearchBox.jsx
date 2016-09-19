import React from 'react'
import { connect } from 'react-redux'
import { setSearchString, addItemToCart, openIngredientModalForItem } from '../actions'
import { getItemsByCategory } from '../selectors'

class SearchBox extends React.Component {
    static propTypes = {
        setSearchValue: React.PropTypes.func.isRequired,
        shownItems: React.PropTypes.object.isRequired,
        addItemToCart: React.PropTypes.func.isRequired
    }

    render () {
        return (
            <div className='input-field'>
                <input onKeyUp={::this.keyPress} id='search' type='search' />
                <label htmlFor='search'><i className='material-icons'>search</i></label>
            </div>
        )
    }

    keyPress (e) {
        const { setSearchValue, shownItems, addItemToCart } = this.props
        setSearchValue(e.target.value)
        if (e.keyCode == 13) {
            const items = shownItems
            if (items.size === 1) {
                addItemToCart(items.get(0))
                setSearchValue('')
                e.target.value = ''
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
            if (item.get('can_have_ingredients')) {
                $('#ingredient-modal').openModal()
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
