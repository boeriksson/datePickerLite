import {css} from 'styled-components';

export const Container = {
    getDefaultStyle: (theme) => css`
        font-weight: 800;
        padding-bottom: 10px;
        padding-top: 35px;
        font-family: Roboto,sans serif;
        
    `
}

export const Grid = {
    getDefaultStyle: (theme) => css`
      display: table;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
    `
}

export const Row = {
    getDefaultStyle: (theme) => css`
      display: table-row;
    `
}

export const Day = {
    getDefaultStyle: (theme) => css`
      display: table-cell;
      width: 39px;
      height: 38px;
      text-align: center;
      vertical-align: middle;
      box-sizing: border-box;
      color: yellow;
      
      .allowed {
        color: black;
      }
      
      .inMonth {
        color: blue
      }
      
      .selected {
        background-color: magenta;
      }
      
      .selectedEdge {
        background-color: red;
      }
      
    `
}

export const Header = {
    getDefaultStyle: (theme) => css`
      display: table-header-group;
      & > div {
        display: table-cell;
        text-align: center;
      }
    `
}
