import {css} from 'styled-components';

export const Container = {
    getDefaultStyle: (theme) => css`
        font-weight: 800;
        padding-bottom: 10px;
        padding-top: 5px;
        font-family: Roboto,sans serif;
        
    `
}

export const Grid = {
    getDefaultStyle: (theme) => css`
      display: table;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      border-collapse: collapse;
    `
}

export const Row = {
    getDefaultStyle: (theme) => css`
      display: table-row;
    `
}

export const Day = {
    getDefaultStyle: (theme) => css`
      position: relative;
      display: table-cell;
      width: 39px;
      height: 38px;
      text-align: center;
      vertical-align: middle;
      box-sizing: border-box;
      color: #222222;
      
      &:hover:not(.unselectable):after {
        content: " ";
        z-index: 10;
        display: block;
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
      }
      
      &.unselectable {
        color: #bbbbbb;
      }
      
      &:not(.unselectable) {
        cursor: pointer;
      }
      
      &:not(.inMonth) {
        color: transparent;
      }
      
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
}

export const Header = {
    getDefaultStyle: (theme) => css`
      display: table-header-group;
      & > div {
        display: table-cell;
        text-align: center;
        color: #777777;
      }
    `
}
