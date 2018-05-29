import {css} from 'styled-components';

export const Container = ({ theme }) => css`
  ${theme.skins.DatepickerLite.Container.getDefaultStyle(theme)} 
`

export const Grid = ({ theme }) => css`
  ${theme.skins.DatepickerLite.Grid.getDefaultStyle(theme)}
`

export const Row = ({ theme }) => css`
  ${theme.skins.DatepickerLite.Row.getDefaultStyle(theme)}
`

export const Day = ({ theme }) => css`
  ${theme.skins.DatepickerLite.Day.getDefaultStyle(theme)}
`

export const Header = ({ theme }) => css`
  ${theme.skins.DatepickerLite.Header.getDefaultStyle(theme)}
`
