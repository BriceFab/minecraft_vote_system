import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './templates/theme';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename={'/'}>
            <App />
        </Router>
    </ThemeProvider>,
    document.querySelector('#root'),
);

serviceWorker.unregister();