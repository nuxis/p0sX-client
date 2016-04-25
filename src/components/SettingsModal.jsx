import React from 'react'
import { connect } from 'react-redux'
import settings from '../settings'
import { setInitialData } from '../actions'

const SettingsModal = React.createClass({
    propTypes: {
        onSave: React.PropTypes.func.isRequired,
        initial: React.PropTypes.bool.isRequired
    },
    render: function () {
        const {onSave, initial} = this.props
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
                                        <input id='server' type='text' className='validate' />
                                        <label htmlFor='server'>Server</label>
                                    </div>
                                    <div className='input-field col s12'>
                                        <input id='token' type='text' className='validate' />
                                        <label htmlFor='token'>Token</label>
                                    </div>
                                </div>
                            </div>
                         </li>
                    </ul>
                </div>
                <div className='modal-footer'>
                    <a href='#!' onClick={() => onSave(initial)} className='modal-action modal-close waves-effect waves-green btn-flat'>Save</a>
                    <a href='#!' className='modal-action modal-close waves-effect waves-red btn-flat'>Cancel</a>
                </div>
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    var allSettings = settings.get()

    return {
        initial: Object.getOwnPropertyNames(allSettings).length === 0
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (initial) => {
            var server = $('#server').val()
            var token = $('#token').val()

            settings.set('server_address', server)
            settings.set('api_auth_token', token)

            if (initial) {
                console.log('get data')
                dispatch(setInitialData())
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsModal)
