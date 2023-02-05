import { createGlobalStyle } from "styled-components";
import { hexToRgb, rgbString } from "./utils/styled";

/* const $prime = "#ff6e48"; */
const $ciBlue = "#00fff1";
/* const $ciRed = "#ff00aa"; */
const $ciWhite = "#ffffff";
/* const $ciGreen = "#46fcb4"; */
const $ciSecond = "#0c1016";

export const GlobalStyle = createGlobalStyle`


body,
html {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${$ciSecond};
  font-size: 20px;
  margin: 0;
  padding: 0;
  color: ${$ciWhite};
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

a {
  color: rgba(${rgbString(hexToRgb($ciBlue))},0.4)
}
`;

export default GlobalStyle;
