import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import { getModelByDate, stepForward, stepBackward, getCurrentlyDisplayedMonth, dayClicked } from './model'

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
        this.conf = {
            displayDate: props.displayDate,
            selectedStartDate: props.selectedStartDate,
            selectedEndDate: props.selectedEndDate,
            allowedStartDate: props.allowedStartDate,
            allowedEndDate: props.allowedEndDate
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
        this.props.callback({
            stepForward: () => {
                const model = stepForward(this.state.model.config)
                this.onChange(model)
                this.setState({ model })
            },
            stepBackward: () => {
                const model = stepBackward(this.state.model.config)
                this.onChange(model)
                this.setState({ model })
            }
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
    callback: PropTypes.func
}

export default Base
