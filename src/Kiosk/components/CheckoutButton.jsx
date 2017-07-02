import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

const CheckoutButton = React.createClass({
    propTypes: {
        onClick: PropTypes.func.isRequired,
        total: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired
    },
    render: function () {
        const {onClick, total, active} = this.props

        return (
            <RaisedButton onClick={onClick} disabled={!active} fullWidth primary label={'Total: ' + total + ',-'} />
        )
    }
})

export default CheckoutButton
