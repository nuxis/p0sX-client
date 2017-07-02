import { Link } from 'react-router'
import React from 'react'
import PropTypes from 'prop-types'

const root = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1)

const AppLink = React.createClass({
    propTypes: {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        to: PropTypes.string.isRequired
    },
    render: function () {
        const {to, children} = this.props
        if (to === '/') {
            return <Link to={root + 'app.html'}>{children}</Link>
        }
        return <Link to={root + to}>{children}</Link>
    }
})

export default AppLink
