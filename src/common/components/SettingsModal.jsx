import React from 'react'
import { connect } from 'react-redux'
import settings from '../settings'
import * as selectors from '../../Kiosk/selectors'
import axios from 'axios'
import { getAllKioskData, openAndGetCurrentShift, emptyCart, updateSettings } from '../../Kiosk/actions'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import {red500} from 'material-ui/styles/colors'

class SettingsModal extends React.Component {
    static propTypes = {
        open: React.PropTypes.any,
        toggleOpen: React.PropTypes.any.isRequired,
        onSave: React.PropTypes.func,
        server: React.PropTypes.string,
        token: React.PropTypes.string,
        name: React.PropTypes.string,
        initial: React.PropTypes.bool
    }

    onSave = () => {
        const { onSave, toggleOpen, initial } = this.props
        onSave(initial)
        toggleOpen()
    }

    render () {
        const { open, toggleOpen, server, token, name } = this.props

        const actions = [
            <FlatButton
                label='Cancel'
                primary
                onTouchTap={toggleOpen}
                rippleColor={red500}
            />,
            <FlatButton
                label='Save'
                primary
                onTouchTap={this.onSave}
            />
        ]

        return (
            <Dialog actions={actions} modal onRequestClose={toggleOpen} open={open} title='Settings'>
                <TextField
                    id='server'
                    floatingLabelText='Server'
                    defaultValue={server}
                    fullWidth
                /><br />
                <TextField
                    id='token'
                    floatingLabelText='Token'
                    defaultValue={token}
                    fullWidth
                /><br />
                <TextField
                    id='name'
                    floatingLabelText='Name'
                    defaultValue={name}
                    fullWidth
                />
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initial: Object.getOwnPropertyNames(settings.get()).length === 0,
        ...selectors.getSettings(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (initial) => {
            const server = $('#server').val()
            const token = $('#token').val()
            const name = $('#name').val()
            settings.set('name', name)
            settings.set('server_address', server)
            settings.set('api_auth_token', token)
            // eslint-disable-next-line immutable/no-mutation
            axios.defaults.headers.common['Authorization'] = `Token ${settings.get('api_auth_token')}`
            // eslint-disable-next-line immutable/no-mutation
            axios.defaults.baseURL = settings.get('server_address')
            dispatch(updateSettings({
                server: server,
                token: token,
                name: name
            }))
            if (initial) {
                dispatch(getAllKioskData())
            }
        },
        openShiftModal: () => {
            $('#settings-modal').closeModal()
            dispatch(openAndGetCurrentShift())
        },
        fetchData: () => {
            dispatch(getAllKioskData())
            dispatch(emptyCart())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsModal)
