import { createGlobalStyle } from 'styled-components/macro';

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;

        ::-webkit-scrollbar {
            width: 0px;
        }
    };
    #root {
        display: flex;
        background-color: #FFF;
        height: 100vh;
    };

    .scroll-to-bottom {
        height: calc(100% - 114px);
        background: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png') repeat center;
    };
`;