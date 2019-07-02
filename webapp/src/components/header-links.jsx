import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import StarHalfIcon from '@material-ui/icons/StarHalf';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CustomDropdown from "../templates/material-kit/components/CustomDropdown/CustomDropdown.jsx";
import Button from '../templates/material-kit/components/CustomButtons/Button';
import headerLinksStyle from '../templates/material-kit/assets/jss/material-kit-react/components/headerLinksStyle';
import combineStyles from "../services/combineStyles.js";
import classNames from 'classnames';
import { Divider } from "@material-ui/core";

const styles = theme => ({
  btnCompte: {
    width: '100%',
    display: 'block',
  }
});

const combinedStyles = combineStyles(headerLinksStyle, styles);

class HeaderLinks extends Component {

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
          <ListItem className={classes.listItem}>
            {!this.props.loggedIn &&
              <Button
                onClick={() => { this.props.history.push('/login'); this.menuClose.bind(this); }}
                className={classNames(classes.registerNavLink, classes.btnCompte)}
                color="rose"
                round>
                Compte
              </Button>
            }
            {this.props.loggedIn &&
              <CustomDropdown
                noLiPadding
                buttonText={'Compte'}
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent"
                }}
                buttonIcon={AccountCircleIcon}
                dropdownList={[
                  <Link to="/management" className={classes.dropdownLink} onClick={this.menuClose.bind(this)}>
                    Management
                  </Link>,
                  <Link to="/crediter" className={classes.dropdownLink} onClick={this.menuClose.bind(this)}>
                    Crediter
                  </Link>,
                  <Divider />,
                  <Link to="/profil" className={classes.dropdownLink} onClick={this.menuClose.bind(this)}>
                    Mon profil
                  </Link>,
                  <Link to="/logout" className={classes.dropdownLink} onClick={this.menuClose.bind(this)}>
                    Deconnexion
                   </Link>,
                ]}
              />
            }
            {/* <LinkButton to={this.state.loggedIn ? '/compte' : '/login'}
                          className={classNames(classes.registerNavLink, classes.btnCompte)}
                          color="rose"
                          round>
                          Compte
              </LinkButton> */}
          </ListItem>
        </List>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn && state.user.token,
});

export default connect(mapStateToProps)(withRouter(withStyles(combinedStyles)(HeaderLinks)));