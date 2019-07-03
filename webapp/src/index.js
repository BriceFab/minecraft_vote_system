import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './templates/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import * as serviceConsole from './services/console';
import './services/translate';
import './validators/messages';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router basename={'/'}>
                <App />
            </Router>
        </ThemeProvider>
    </Provider>,
    document.querySelector('#root'),
);

if (process.env.NODE_ENV !== 'development') {
    serviceConsole.register();
}
serviceWorker.unregister();