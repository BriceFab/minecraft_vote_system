import React, { Component, Suspense } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import { isMobile } from 'react-device-detect';
import CONFIG from './config';
import { Helmet } from "react-helmet";
import { Typography } from '@material-ui/core';

//Theme
import theme from './theme/theme';

//Styles
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import 'react-toastify/dist/ReactToastify.min.css';

//Routes
import Routes from './Routes';

const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Suspense fallback={<Typography component={'h1'}>Chargement..</Typography>}>

        <Helmet>
          <title>{CONFIG.APP.NAME}</title>
          <link rel="canonical" href={`${CONFIG.APP.FULL_URL}/`} />
          <meta charSet="utf-8" />
          <meta name="description" content="TODO" />
          <meta name="keywords" content="TODO" />
        </Helmet>

        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Router history={browserHistory}>
              <Routes />
            </Router>
          </ThemeProvider>

          <ToastContainer
            position={isMobile ? 'top-right' : 'bottom-left'}
            autoClose={3000}
          />
        </Provider>
      </Suspense>
    );
  }
}