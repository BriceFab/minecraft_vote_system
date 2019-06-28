import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { List, ListItem, withStyles } from "@material-ui/core";
import { Link } from 'react-router-dom';
import footerStyle from './material-kit/assets/jss/material-kit-react/components/footerStyle';
import moment from "moment";
import CONFIG from "../config";

function Footer({ ...props }) {
  const { classes, whiteFont } = props;

  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link
                to={'/contacter'}
                className={classes.block}>
                Nous contacter
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link
                to={'propos'}
                className={classes.block}>
                A propos
              </Link>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {moment(new Date()).format('Y')} {CONFIG.APP.NAME.toLowerCase()}
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);