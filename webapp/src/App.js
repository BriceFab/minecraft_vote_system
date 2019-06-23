import HeaderBar from './components/header-bar';
import { withStyles, Typography } from '@material-ui/core';
import React, { Component } from 'react';

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
            <Typography paragraph>
                content
            </Typography>
          </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);