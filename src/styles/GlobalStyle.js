import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root{
        --color-primary: #398234;
        --color-hover: #0d5f07;
        --color-border: #e6e6e6;
        --color-border-hover: #adb5bd;
        --color-light-gray: #c8c8c8;
        --color-dark-gray: #616161;
        --color-danger: #C50000;
        --color-black: #333333;
        --color-white: #FFFFFF;
        --color-text: #495057;
    }

    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    html{
        font-size: 62.5%;
        color: var(--color-text);
    }

    h1, h2, h3, h4, h5, h6{
        color: var(--color-black);
    }

    button {
        cursor: pointer;
    }
`;