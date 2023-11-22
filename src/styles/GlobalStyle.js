import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root{
        --color-primary: #3DCD7A;
        --color-hover: #36B56B;
        --color-border: #E6E6E6;
        --color-border-hover: #ADB5BD;
        --color-input-focus: #F4FDF8;
        --color-light-gray: #F7F7F7;
        --color-dark-gray: #616161;
        --color-danger: #FD6264;
        --color-input-danger: #FCF2F2;
        --color-black: #333333;
        --color-white: #FFFFFF;
        --color-text: #495057;
        --color-kakao: #FEE813;
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
    
    body{
        font-size: 1.4rem;
    }

    h1, h2, h3, h4, h5, h6, label, legend{
        // color: var(--color-black);
    }

    p, span, div {
        font-size: 1.4rem;
    }

    button {
        cursor: pointer;
    }
`;