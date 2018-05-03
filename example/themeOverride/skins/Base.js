import {css} from 'styled-components';

export const Container = ({ theme }) => {
    console.log('themeOverride: ', theme);
    return css`
      ${theme.skins.Base.Container.getDefaultStyle(theme)}
      color: 'blue';
    `
}
