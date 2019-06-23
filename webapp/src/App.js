import HeaderBar from './components/header-bar';
import { withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import HomePage from './pages/home';
import TestPage from './pages/test';
import NotFoundPage from './pages/not-found';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
});

class App extends Component {
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <HeaderBar />
          <main className={classes.content}>
          <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/test" component={TestPage}/>
              <Route component={NotFoundPage}/>
            </Switch>
          </main>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));