import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const baseStyles = (props) => props.theme.skins.Base.Container(props)
const StyledBase = styled.div`${baseStyles}`

class Base extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.callback({
            currentlyDisplayedMonth: '2018:05',
            stepForward: () => { console.log('stepForward') },
            stepBackward: () => { console.log('stepBackward') }
        })
    }

    render() {
        const { startDate, endDate } = this.props;
        return (
            <StyledBase>
                <div>startDate: { startDate }</div>
                <div>endDate: { endDate }</div>
            </StyledBase>
        )
    }
}

Base.propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    onDatesChange: PropTypes.func,
    callback: PropTypes.func
}

export default Base
