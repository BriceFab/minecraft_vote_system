import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import CONFIG from "../config";
import { withRouter } from 'react-router-dom';
import Header from '../templates/material-kit/components/Header/Header';
import Parallax from '../templates/material-kit/components/Parallax/Parallax';
import componentsPageStyle from "../templates/material-kit/assets/jss/material-kit-react/views/components";
import HeaderLinks from './header-links';
import combineStyles from './combineStyles';
import { Modal } from "@material-ui/core";
import LoginForm from '../components/forms/login';

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

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      loginFormOpen: false,
    }
  }

    render() {
        const {classes} = this.props;

        return (
          <>
            <Header
              brand={CONFIG.APP.NAME.toUpperCase()}
              rightLinks={<HeaderLinks openLogin={() => {this.setState({loginFormOpen: true})}} />}
              fixed
              color="transparent"
              changeColorOnScroll={{
                height: 400,
                color: "white"
              }}
            />
            <Parallax small image={require(`../assets/img/header.jpg`)} className={classes.header} />

            <Modal disableAutoFocus={true} open={this.state.loginFormOpen} style={{overflowY: 'scroll', paddingTop: '18vh'}} onClose={() => {this.setState({loginFormOpen: false})}}>
                <LoginForm />
              </Modal>
          </>
        );
    }

}
export default withRouter(withStyles(combinedStyles)(HeaderBar));