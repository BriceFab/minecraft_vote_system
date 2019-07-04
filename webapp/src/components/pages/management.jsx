import React, { Component } from "react";
import { withStyles, Paper, Grid } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CONFIG from '../../config';
import requiredAuth from "../../services/required-auth";
import Button from "../../templates/material-kit/components/CustomButtons/Button.jsx";
import HeaderTitle from "../../templates/header-title";
// import classNames from 'classnames';
// import componentsStyle from "../../templates/material-kit/assets/jss/material-kit-react/views/components.jsx";
// import combineStyles from "../../services/combineStyles";

const styles = theme => ({
  content: {
    padding: theme.spacing(3),
    margin: '0px 25px 0px 25px',
  },
  divider: {
    paddingBottom: 25
  }
});

// const combinedStyles = combineStyles(componentsStyle, styles);

class ManagementPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <Helmet>
          <title>{CONFIG.APP.NAME} - Management</title>
          <link rel="canonical" href={`${CONFIG.APP.FULL_URL}/compte`} />
          <meta charSet="utf-8" />
          <meta name="description" content="TODO" />
          <meta name="keywords" cpntent="TODO" />
        </Helmet>

        <HeaderTitle title={'Gestion de mes serveurs'} />

        <Paper className={classes.content}>

          <Grid container direction={"row"} justify={"flex-end"} alignItems={"center"}>
            <Grid item>
              <Button color="primary">Ajouter un serveur</Button>
            </Grid>
          </Grid>

          Liste des serveurs

        </Paper>

        <div className={classes.divider} />

      </>
    );
  }
}
export default (requiredAuth()(withStyles(styles)(ManagementPage)));