import { connect } from 'react-redux'
import { setInitialData } from '../actions'
import App from '../components/App.jsx'
import settings from '../settings'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInitialData: () => {
            dispatch(setInitialData())
        },
        openSettings: () => {
            $('#server').val(settings.get('server_address'))
            $('#token').val(settings.get('api_auth_token'))
            $('#settings-modal').openModal()
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
