import React, { Component } from "react";
import { withStyles, Paper, Grid, Modal, Fab, Tooltip } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CONFIG from '../../config';
import requiredAuth from "../../services/required-auth";
import Button from "../../templates/material-kit/components/CustomButtons/Button.jsx";
import AddIcon from '@material-ui/icons/Add';
import HeaderTitle from "../../templates/header-title";
import TYPE from "../constants/modal";
import ServerForm from '../forms/server';
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
  constructor(props) {
    super(props);

    this.state = {
      serverFormOpen: false,
      type: TYPE.ADD,
    }
  }

  onCloseForm() {
    this.setState({ serverFormOpen: false });
  }

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
              <Tooltip title="Ajouter un serveur" aria-label="Add">
                <Fab color="primary" aria-label="Add" onClick={() => { this.setState({ serverFormOpen: true, type: TYPE.ADD }) }}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>

          Liste des serveurs

        </Paper>

        <div className={classes.divider} />

        <Modal open={this.state.serverFormOpen} style={{ overflowY: "scroll" }} onClose={this.onCloseForm.bind(this)} disableAutoFocus={true}>
          <ServerForm type={this.state.type} close={this.onCloseForm.bind(this)} />
        </Modal>

      </>
    );
  }
}
export default (requiredAuth()(withStyles(styles)(ManagementPage)));