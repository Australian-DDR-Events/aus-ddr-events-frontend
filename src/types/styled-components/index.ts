import * as styledComponents from 'styled-components';

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider,
  // eslint-disable-next-line max-len
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

export interface IThemeInterface {}

export const theme = {};

export default styled;
export { css, keyframes, ThemeProvider };
