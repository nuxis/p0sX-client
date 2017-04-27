import React from 'react'
import {ListItem} from 'material-ui/List'

class Category extends React.Component {
    static propTypes = {
        onClick: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        category: React.PropTypes.object.isRequired,
        value: React.PropTypes.any
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
