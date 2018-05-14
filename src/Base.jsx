import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import { getModelByDate } from './model'

const baseStyles = (props) => props.theme.skins.Base.Container(props)
const StyledBase = styled.div`${baseStyles}`
const gridStyles = (props) => props.theme.skins.Base.Grid(props)
const StyledGrid = styled.div`${gridStyles}`
const rowStyles = (props) => props.theme.skins.Base.Row(props)
const StyledRow = styled.div`${rowStyles}`
const dayStyles = (props) => props.theme.skins.Base.Day(props)
const StyledDay = styled.div`${dayStyles}`
const headerStyles = (props) => props.theme.skins.Base.Header(props)
const StyledHeader = styled.div`${headerStyles}`

class Base extends Component {
    constructor(props) {
        super(props)
        console.log('base.. %o', this);
        this.model = getModelByDate()
        //console.log('Model: ', model);
    }

    componentDidMount() {
        this.props.callback({
            currentlyDisplayedMonth: '2018:05',
            stepForward: () => { console.log('stepForward') },
            stepBackward: () => { console.log('stepBackward') }
        })
    }

    displayModel() {
        const { weekHeaders, monthDisplay } = this.model
        const headers = (<StyledHeader>
            { weekHeaders.map((header, ix) => <div key={ ix }>{header}</div>) }
        </StyledHeader>)
        const month = monthDisplay.map((week, ix) =>
            <StyledRow key={ ix }>{ week.map((day, ix) =>
                <StyledDay key={ix} classNames={ classnames(day) }>{day.dayNo}</StyledDay>)
            }</StyledRow>)
        return (
            <StyledGrid>
                { headers }
                { month }
            </StyledGrid>
        )
    }

    render() {
        const { startDate, endDate } = this.props;
        return (
            <StyledBase>
                <div>startDate: { startDate }</div>
                <div>endDate: { endDate }</div>
                { this.displayModel() }
            </StyledBase>
        )
    }
}

Base.propTypes = {
    displayDate: PropTypes.string,
    endDate: PropTypes.string,
    onDatesChange: PropTypes.func,
    callback: PropTypes.func
}

export default Base
