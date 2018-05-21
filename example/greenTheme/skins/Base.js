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
        border: 1px solid #70e1a0;
        background-color: #e7fce9;
      }
      
      &.selectedEdge {
        color: white;
        border: 1px solid #147b45;
        background-color: #147b45;
      }
`

export const Header = ({ theme }) => css`
  ${theme.skins.Base.Header.getDefaultStyle(theme)}
`
