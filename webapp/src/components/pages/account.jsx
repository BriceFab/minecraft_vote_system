import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CONFIG from '../../config';
import requiredAuth from "../../services/required-auth";

const styles = theme => ({

});

class AccountPage extends Component {
  render() {
    // const {classes} = this.props;

    return (
      <>
        <Helmet>
          <title>{CONFIG.APP.NAME} - Mon compte</title>
          <link rel="canonical" href={`${CONFIG.APP.FULL_URL}/compte`} />
          <meta charSet="utf-8" />
          <meta name="description" content="TODO" />
          <meta name="keywords" cpntent="TODO" />
        </Helmet>

        TODO
      </>
    );
  }
}
export default (requiredAuth()(withStyles(styles)(AccountPage)));