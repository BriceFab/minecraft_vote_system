import React, { Component, Suspense } from 'react';
import HeaderBar from './components/header-bar';
import { withStyles, Typography } from '@material-ui/core';
import { withRouter, Route, Switch } from 'react-router-dom';
import componentsStyle from "./templates/material-kit/assets/jss/material-kit-react/views/components.jsx";
import classNames from 'classnames';
import combineStyles from './services/combineStyles';
import Footer from './components/footer';
import { Helmet } from "react-helmet";
import CONFIG from './config';
import { ToastContainer } from 'react-toastify';
import { isMobile } from "react-device-detect";
import HomePage from './components/pages/home';
import LoginPage from './components/pages/login';
import ManagementPage from './components/pages/management';
import NotFoundPage from './components/pages/not-found';
import LogoutPage from './components/pages/logout';

// import "./templates/material-kit/assets/scss/material-kit-react.scss?v=1.7.0";
import 'react-toastify/dist/ReactToastify.min.css';

const styles = theme => ({
  contentNoMargin: {
    marginLeft: 0,
    marginRight: 0,
  }
});

const combinedStyles = combineStyles(componentsStyle, styles);

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Suspense fallback={<Typography component={'h1'}>Chargement..</Typography>}>
        <Helmet>
          <title>{CONFIG.APP.NAME}</title>
          <link rel="canonical" href={`${CONFIG.APP.FULL_URL}/`} />
          <meta charSet="utf-8" />
          <meta name="description" content="TODO" />
          <meta name="keywords" content="TODO" />
        </Helmet>

        <HeaderBar />

        <div className={classNames(classes.main, classes.mainRaised, isMobile ? classes.contentNoMargin : {})}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/accueil" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/management" component={ManagementPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>

        <ToastContainer
          position={isMobile ? 'top-right' : 'bottom-left'}
          autoClose={3000}
        />

        <Footer />
      </Suspense>
    );
  }
}

export default withRouter(withStyles(combinedStyles)(App));