import HeaderBar from './components/header-bar';
import { withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import HomePage from './pages/home';
import TestPage from './pages/test';
import AccountPage from './pages/account';
import NotFoundPage from './pages/not-found';
import componentsStyle from "./templates/material-kit/assets/jss/material-kit-react/views/components.jsx";
import classNames from 'classnames';
import combineStyles from './components/combineStyles';
import Footer from './templates/footer';

// import "./templates/material-kit/assets/scss/material-kit-react.scss?v=1.7.0";

const styles = theme => ({
});

const combinedStyles = combineStyles(componentsStyle, styles);

class App extends Component {
  render() {
    const {classes} = this.props;

    return (
      <>
        <HeaderBar />
          <div className={classNames(classes.main, classes.mainRaised)}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/compte" component={AccountPage} />
              <Route path="/test" component={TestPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
          <Footer />
      </>
    );
  }
}

export default withRouter(withStyles(combinedStyles)(App));