import React from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Component styles
const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    flexGrow: 1
  },
  noPadding: {
    padding: 0
  }
});

const PortletContent = props => {
  const { classes, className, children, noPadding, ...rest } = props;

  const rootClassName = classNames(
    {
      [classes.root]: true,
      [classes.noPadding]: noPadding
    },
    className
  );

  return (
    <div
      {...rest}
      className={rootClassName}
    >
      {children}
    </div>
  );
};

PortletContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  noPadding: PropTypes.bool
};

export default withStyles(styles)(PortletContent);
