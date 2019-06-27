/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Apps } from "@material-ui/icons";
import StarHalfIcon from '@material-ui/icons/StarHalf';
import WhatshotIcon from '@material-ui/icons/Whatshot';

// core components
import CustomDropdown from "./material-kit/components/CustomDropdown/CustomDropdown.jsx";

import headerLinksStyle from './material-kit/assets/jss/material-kit-react/components/headerLinksStyle';
import LinkButton from "./LinkButton.jsx";

function HeaderLinks({ ...props }) {
  const { classes } = props;

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to={'/serveurs'} className={classes.navLink}>
          <StarHalfIcon className={classes.icons} /> Serveurs
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to={'/promouvoir'} className={classes.navLink}>
          <WhatshotIcon className={classes.icons} /> Promouvoir
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
          <LinkButton to={'/compte'}
                      className={classes.registerNavLink}
                      color="rose"
                      round>
                      Compte
          </LinkButton>
      </ListItem>
      <ListItem className={classes.listItem}>
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
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
