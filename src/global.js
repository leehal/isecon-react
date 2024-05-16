import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  :root {
    --DARKBLUE : #4682A9;
    --MIDBLUE : #749BC2;
    --LIGHTBLUE : #91C8E4;
    --IVORY : #F6F4EB;
    --GREY : #E0E4E9;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
  }
  `;
export default GlobalStyle;
