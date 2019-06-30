/*eslint-disable*/
import React, { Component } from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Apps } from "@material-ui/icons";
import StarHalfIcon from '@material-ui/icons/StarHalf';
import WhatshotIcon from '@material-ui/icons/Whatshot';

// core components
import CustomDropdown from "../templates/material-kit/components/CustomDropdown/CustomDropdown.jsx";
import Button from '../templates/material-kit/components/CustomButtons/Button';

import headerLinksStyle from '../templates/material-kit/assets/jss/material-kit-react/components/headerLinksStyle';
import LinkButton from "../templates/LinkButton.jsx";
import combineStyles from "../services/combineStyles.js";
import classNames from 'classnames';

const styles = theme => ({
  btnCompte: {
    width: '100%',
    display: 'block',
  }
});

const combinedStyles = combineStyles(headerLinksStyle, styles);

class HeaderLinks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    }
  }

  menuClose() {
    if (this.props.menuClose) {
      this.props.menuClose();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <List className={classes.list}>
          <ListItem className={classes.listItem} onClick={this.menuClose.bind(this)}>
            <Link to={'/serveurs'} className={classes.navLink}>
              <StarHalfIcon className={classes.icons} /> Serveurs
            </Link>
          </ListItem>
          <ListItem className={classes.listItem} onClick={this.menuClose.bind(this)}>
            <Link to={'/promouvoir'} className={classes.navLink}>
              <WhatshotIcon className={classes.icons} /> Promouvoir
            </Link>
          </ListItem>
          <ListItem className={classes.listItem} onClick={this.menuClose.bind(this)}>
            {!this.state.loggedIn &&
              <Button
                onClick={() => { this.props.history.push('/compte') }}
                className={classNames(classes.registerNavLink, classes.btnCompte)}
                color="rose"
                round>
                Compte
              </Button>
            }
            {/* <LinkButton to={this.state.loggedIn ? '/compte' : '/login'}
                          className={classNames(classes.registerNavLink, classes.btnCompte)}
                          color="rose"
                          round>
                          Compte
              </LinkButton> */}
          </ListItem>
          {/* <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              buttonText="Components"
              buttonProps={{
                className: classes.navLink,
                color: "transparent"
              }}
              buttonIcon={Apps}
              dropdownList={[
                <Link to="/" className={classes.dropdownLink}>
                  All components
                </Link>,
                <a
                  href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
                  target="_blank"
                  className={classes.dropdownLink}
                >
                  Documentation
                </a>
              ]}
            />
          </ListItem> */}
        </List>
      </>
    );
  }
}

export default withRouter(withStyles(combinedStyles)(HeaderLinks));