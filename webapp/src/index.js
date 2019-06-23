import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './templates/theme';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
    <App />
    </ThemeProvider>,
    document.querySelector('#root'),
);

serviceWorker.unregister();