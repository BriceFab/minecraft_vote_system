import React, { Component, Suspense } from 'react';
import HeaderBar from './components/header-bar';
import { withStyles } from '@material-ui/core';
import { withRouter, Route, Switch } from 'react-router-dom';
import componentsStyle from "./templates/material-kit/assets/jss/material-kit-react/views/components.jsx";
import classNames from 'classnames';
import combineStyles from './services/combineStyles';
import Footer from './components/footer';
import { Helmet } from "react-helmet";
import CONFIG from './config';
import { ToastContainer } from 'react-toastify';
import HomePage from './components/pages/home';
import LoginPage from './components/pages/login';
import AccountPage from './components/pages/account';
import NotFoundPage from './components/pages/not-found';

// import "./templates/material-kit/assets/scss/material-kit-react.scss?v=1.7.0";
import 'react-toastify/dist/ReactToastify.min.css';

const styles = theme => ({
});

const combinedStyles = combineStyles(componentsStyle, styles);

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Suspense fallback={<div>Chargement..</div>}>
        <Helmet>
          <title>{CONFIG.APP.NAME}</title>
          <link rel="canonical" href={`${CONFIG.APP.FULL_URL}/`} />
          <meta charSet="utf-8" />
          <meta name="description" content="TODO" />
          <meta name="keywords" cpntent="TODO" />
        </Helmet>

        <HeaderBar />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/accueil" component={HomePage} />
            <Route path="/compte" component={AccountPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>

        <ToastContainer />

        <Footer />
      </Suspense>
    );
  }
}

export default withRouter(withStyles(combinedStyles)(App));