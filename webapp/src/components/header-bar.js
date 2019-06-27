import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import CONFIG from "../config";
import { withRouter } from 'react-router-dom';
import Header from '../templates/material-kit/components/Header/Header';
import Parallax from '../templates/material-kit/components/Parallax/Parallax';
import componentsPageStyle from "../templates/material-kit/assets/jss/material-kit-react/views/components";
import HeaderLinks from '../templates/header-links';
import combineStyles from './combineStyles';

const styles = theme => ({
  header: {
    backgroundPosition: 'center top',
    height: 150
  }
});

const combinedStyles = combineStyles(componentsPageStyle, styles);

/**
 * Barre de l'application
 */
class HeaderBar extends Component {

    render() {
        const {classes} = this.props;

        return (
          <>
            <Header
              brand={CONFIG.APP.NAME.toUpperCase()}
              rightLinks={<HeaderLinks />}
              fixed
              color="transparent"
              changeColorOnScroll={{
                height: 400,
                color: "white"
              }}
            />
            <Parallax small image={require(`../assets/img/header.jpg`)} className={classes.header} />
          </>
        );
    }

}
export default withRouter(withStyles(combinedStyles)(HeaderBar));