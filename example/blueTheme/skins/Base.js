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
      &.selected {
        border: 1px solid #1e4eff;
        background-color: #819cff;
      }
      
      &.selectedEdge {
        color: white;
        border: 1px solid #001871;
        background-color: #002093;
      }
`

export const Header = ({ theme }) => css`
  ${theme.skins.Base.Header.getDefaultStyle(theme)}
`
