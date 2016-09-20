import React from 'react'
import { connect } from 'react-redux'
import settings from '../settings'

class SettingsModal extends React.Component {
    static propTypes = {
        onSave: React.PropTypes.func.isRequired,
        initial: React.PropTypes.bool.isRequired
    }

    onClick () {
        const { onSave, initial } = this.props
        onSave(initial)
    }

    render () {
        return (
            <div id='settings-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h4>Change settings</h4>
                    <ul className='collapsible' data-collapsible='accordion'>
                        <li className='active'>
                            <div className='collapsible-header active'><i className='material-icons'>list</i>Shifts</div>
                            <div className='collapsible-body'>
                                <p>
                                    Settings about shifts and so on...
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='collapsible-header red-text'><i className='material-icons black-text'>vpn_key</i>Here be dragons</div>
                            <div className='collapsible-body'>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input id='server' type='url' className='validate' />
                                        <label className='active' htmlFor='server'>Server</label>
                                    </div>
                                    <div className='input-field col s12'>
                                      <input id='token' type='text' className='validate' />
                                      <label className='active' htmlFor='token'>Token</label>
                                    </div>
                                    <div className='input-field col s12'>
                                      <input id='customer_order_delay' type='number' className='validate' />
                                      <label className='active' htmlFor='token'>Update rate for Customer orders</label>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='modal-footer'>
                    <a href='#!' onClick={::this.onClick} className='modal-action modal-close waves-effect waves-green btn-flat'>Save</a>
                    <a href='#!' className='modal-action modal-close waves-effect waves-red btn-flat'>Cancel</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => {
    var allSettings = settings.get()
    return {
        initial: Object.getOwnPropertyNames(allSettings).length === 0
    }
}

const mapDispatchToProps = () => {
    return {
        onSave: (initial) => {
            const server = $('#server').val()
            const token = $('#token').val()
            const customerOrderDelay = $('#customer_order_delay').val()

            settings.set('server_address', server)
            settings.set('api_auth_token', token)
            settings.set('customer_order_delay', customerOrderDelay)
        }
    }
}

const open = () => {
    $('#server').val(settings.get('server_address'))
    $('#token').val(settings.get('api_auth_token'))
    // eslint-disable-next-line no-undef
    Materialize.updateTextFields()
    $('#settings-modal').openModal()
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsModal)

export {
    open
}
