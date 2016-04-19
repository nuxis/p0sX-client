import React from 'react'
import classNames from 'classnames'

const Category = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        active: React.PropTypes.bool.isRequired
    },
    render: function () {
        const { onClick, name, active } = this.props
        return (
            <a className={classNames({'collection-item': true, 'active': active})} onClick={onClick}>
                {name}
            </a>
        )
    }
})

export default Category
