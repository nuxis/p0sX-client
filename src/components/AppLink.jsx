import { Link } from 'react-router'
import React from 'react'

const root = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1)

const AppLink = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ]),
        to: React.PropTypes.string.isRequired
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
