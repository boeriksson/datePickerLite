import {css} from 'styled-components';

export const Container = ({ theme }) => css`
      ${theme.skins.Base.Container.getDefaultStyle(theme)} 
      color: blue;
      padding-top: 20px; 
    `
