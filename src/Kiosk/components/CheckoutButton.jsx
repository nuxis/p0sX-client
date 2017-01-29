import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const CheckoutButton = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        total: React.PropTypes.number.isRequired,
        active: React.PropTypes.bool.isRequired
    },
    render: function () {
        const {onClick, total, active} = this.props

        return (
            <RaisedButton onClick={onClick} disabled={!active} fullWidth primary label={'Total: ' + total + ',-'} />
        )
    }
})

export default CheckoutButton
