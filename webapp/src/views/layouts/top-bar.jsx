import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ToolBarActions from './top-bar-actions';
import {
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Input as InputIcon
} from '@material-ui/icons';
import styles from '../../theme/styles/top-barStyle';

class TopBar extends Component {
  handleSignOut = () => {
    const { history } = this.props;
    history.push('/sign-in');
  };

  render() {
    const {
      classes,
      className,
      title,
      isSidebarOpen,
      onToggleSidebar
    } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              onClick={onToggleSidebar}
              variant="text"
            >
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              className={classes.title}
              variant="h4"
            >
              {title}
            </Typography>
            <div className={classes.actions}>
              <ToolBarActions />
            </div>
          </Toolbar>
        </div>
      </Fragment>
    );
  }
}

TopBar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};

TopBar.defaultProps = {
  onToggleSidebar: () => { }
};

export default compose(
  withRouter,
  withStyles(styles)
)(TopBar);
