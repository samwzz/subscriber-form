import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import './index.css';
import theme from './theme';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
