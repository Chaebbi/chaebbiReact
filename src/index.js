import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { GlobalStyle } from './styles/GlobalStyle'
import { store } from './store/config';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
            <GlobalStyle />
            <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  )