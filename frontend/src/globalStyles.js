import { createGlobalStyle } from 'styled-components/macro';

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }

    .app {
        display: flex;
        background-color: #ededed;
        height: 100vh;
        width: 100vw;
    }
`