import * as styledComponents from 'styled-components';

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider,
  // eslint-disable-next-line max-len
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

export interface IThemeInterface {}
export const defaultSpacing = 8;
export { css, keyframes, ThemeProvider };
export default styled;
