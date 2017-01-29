import React from 'react'
import Paper from 'material-ui/Paper'

class Item extends React.Component {
    static propTypes = {
        onClick: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        image: React.PropTypes.string.isRequired,
        id: React.PropTypes.number.isRequired
    }

    componentWillMount = () => this.setState({zDepth: 2})
    onMouseOver = () => this.setState({zDepth: 4})
    onMouseOut = () => this.setState({zDepth: 2})

    click = () => {
        const { onClick, id } = this.props
        onClick(id)
    }

    render () {
        const { name, price, image } = this.props
        return (
            <Paper className='item-card hoverable' zDepth={this.state.zDepth} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onTouchTap={this.click}>
                <img src={image} />
                <div className='name-truncate'>{name}</div>
                <div className='price grey-text text-darken-1'>{price} Kr.</div>
            </Paper>
        )
    }
}

export default Item
