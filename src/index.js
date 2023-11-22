import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle'
import { store } from './store/config';
import App from './App';
import theme from './styles/Theme';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
              <GlobalStyle />
              <App />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  )