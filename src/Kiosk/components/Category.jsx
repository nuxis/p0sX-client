import React from 'react'
import classNames from 'classnames'

class Category extends React.Component {
    static propTypes = {
        onClick: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        active: React.PropTypes.bool.isRequired,
        category: React.PropTypes.object.isRequired
    }

    click () {
        const { onClick, category } = this.props
        onClick(category)
    }

    render () {
        const { name, active } = this.props
        return (
            <a className={classNames({'collection-item': true, 'active': active})} onClick={::this.click}>
                {name}
            </a>
        )
    }
}

export default Category
