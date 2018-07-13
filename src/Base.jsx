import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import {
    getModelByDate,
    stepForward,
    stepBackward,
    goToNow,
    getCurrentlyDisplayedMonth,
    dayClicked
} from './modelFns'

const baseStyles = (props) => props.theme.skins.DatepickerLite.Container(props)
const StyledBase = styled.div`${baseStyles}`
const gridStyles = (props) => props.theme.skins.DatepickerLite.Grid(props)
const StyledGrid = styled.div`${gridStyles}`
const rowStyles = (props) => props.theme.skins.DatepickerLite.Row(props)
const StyledRow = styled.div`${rowStyles}`
const dayStyles = (props) => props.theme.skins.DatepickerLite.Day(props)
const StyledDay = styled.div`${dayStyles}`
const headerStyles = (props) => props.theme.skins.DatepickerLite.Header(props)
const StyledHeader = styled.div`${headerStyles}`

class Base extends Component {
    constructor(props) {
        super(props)
        this.conf = {
            displayDate: props.displayDate,
            selectedStartDate: props.selectedStartDate,
            selectedEndDate: props.selectedEndDate,
            allowedStartDate: props.allowedStartDate,
            allowedEndDate: props.allowedEndDate,
            weekdays: props.weekdays
        }
        this.state = {
            model: getModelByDate(this.conf)
        }
        this.onChange(this.state.model)
    }

    onChange = ({ config }) => {
        this.props.onChange({
            month: getCurrentlyDisplayedMonth(config),
            selectedStartDate: config.selectedStartDate,
            selectedEndDate: config.selectedEndDate
        })
    }

    clickHandler = (day) => {
        if (day.inMonth && !day.unselectable) {
            const model = dayClicked(day, this.state.model.config)
            this.setState({ model })
            this.onChange(model)
        }
    }

    componentDidMount() {
        const doAction = (f) => {
            const model = f(this.state.model.config)
            this.onChange(model)
            this.setState({ model })
        }
        this.props.callback({
            stepForward: () => doAction(stepForward),
            stepBackward: () => doAction(stepBackward),
            goToNow: () => doAction(goToNow)
        })
    }

    displayModel() {
        const { weekHeaders, monthDisplay } = this.state.model
        const headers = (<StyledHeader>
            { weekHeaders.map((header, ix) => <div key={ ix }>{header}</div>) }
        </StyledHeader>)
        const month = monthDisplay.map((week, ix) =>
            <StyledRow key={ ix }>{ week.map((day, ix) =>
                <StyledDay
                    key={ix}
                    className={ classnames(day) }
                    onClick={ e => this.clickHandler(day) }>
                        {day.dayNo}
                </StyledDay>
            )}</StyledRow>)
        return (
            <StyledGrid>
                { headers }
                { month }
            </StyledGrid>
        )
    }

    render() {
        return (
            <StyledBase>
                { this.displayModel() }
            </StyledBase>
        )
    }
}

Base.propTypes = {
    displayDate: PropTypes.string,
    selectedStartDate: PropTypes.string,
    selectedEndDate: PropTypes.string,
    allowedStartDate: PropTypes.string,
    allowedEndDate: PropTypes.string,
    onChange: PropTypes.func,
    callback: PropTypes.func,
    weekdays: PropTypes.shape({
        MONDAY: PropTypes.string.isRequired,
        TUESDAY: PropTypes.string.isRequired,
        WEDNESDAY: PropTypes.string.isRequired,
        THURSDAY: PropTypes.string.isRequired,
        FRIDAY: PropTypes.string.isRequired,
        SATURDAY: PropTypes.string.isRequired,
        SUNDAY: PropTypes.string.isRequired
    })
}

export default Base
