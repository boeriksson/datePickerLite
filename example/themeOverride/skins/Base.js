import {css} from 'styled-components';

export const Container = ({ theme }) => css`
    ${theme.skins.Base.Container.getDefaultStyle(theme)} 
`

export const Grid = ({ theme }) => css`
  ${theme.skins.Base.Grid.getDefaultStyle(theme)}
`

export const Row = ({ theme }) => css`
  ${theme.skins.Base.Row.getDefaultStyle(theme)}
`

export const Day = ({ theme }) => css`
  ${theme.skins.Base.Day.getDefaultStyle(theme)}
`

export const Header = ({ theme }) => css`
  ${theme.skins.Base.Header.getDefaultStyle(theme)}
`
