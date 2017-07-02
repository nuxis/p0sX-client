import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { cashierLogin } from '../actions'
import { getLoggedInCashier, getStrings } from '../selectors'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

class LockModal extends React.Component {
    static propTypes = {
        authenticateCrew: PropTypes.func,
        open: PropTypes.bool,
        strings: PropTypes.object
    }

    keyPress = (e) => {
        const { authenticateCrew } = this.props
        if (e.keyCode === 13) {
            const card = this.refs.unlock.getValue()
            authenticateCrew(card)
            // eslint-disable-next-line immutable/no-mutation
            this.refs.unlock.input.value = ''
        }
    }

    componentDidMount () {
        if (this.props.open) {
            this.focusTextField()
        }
    }

    focusTextField = () => this.refs.unlock.focus()

    componentDidUpdate (prevProps) {
        if (this.props.open && prevProps.open !== this.props.open) {
            setTimeout(() => this.refs.unlock.focus(), 250)
        }
    }

    render () {
        const { open, strings } = this.props

        return (
            <Dialog
                title={strings.scan_card}
                modal
                open={open}
            >
                <TextField
                    onKeyUp={this.keyPress}
                    onBlur={this.focusTextField}
                    type='password'
                    ref='unlock'
                    id='unlock'
                    fullWidth
                />
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        open: getLoggedInCashier(state).locked,
        strings: getStrings(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticateCrew: (card) => dispatch(cashierLogin(card))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LockModal)

export {
    open,
    close
}
