import React from 'react'
import PropTypes from 'prop-types'
import {ListItem} from 'material-ui/List'

class Category extends React.Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.object.isRequired,
        value: PropTypes.any
    }

    click = () => {
        const { onClick, category } = this.props
        onClick(category)
    }

    render () {
        const { name, value } = this.props
        return (
            <ListItem value={value} primaryText={name} onClick={this.click} />
        )
    }
}

export default Category
