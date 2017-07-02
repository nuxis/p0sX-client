import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import Delete from 'material-ui/svg-icons/action/delete'
import {white, red500} from 'material-ui/styles/colors'

const CheckoutButton = React.createClass({
    propTypes: {
        onClick: PropTypes.func.isRequired,
        active: PropTypes.bool.isRequired
    },
    render: function () {
        const {onClick, active} = this.props

        return (
            <RaisedButton disabled={!active} onClick={onClick} fullWidth backgroundColor={red500} icon={<Delete color={white} />} />
        )
    }
})

export default CheckoutButton
