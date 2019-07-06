import React, { Component } from "react";
import { withStyles, Paper, Grid, Fab, Tooltip, Switch } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CONFIG from '../../config';
import requiredAuth from "../../services/required-auth";
import AddIcon from '@material-ui/icons/Add';
import HeaderTitle from "../../templates/header-title";
import TYPE from "../constants/modal";
import ServerForm from '../forms/server';
import DialogForm from "../../templates/dialog-form";
import MaterialTable from "material-table";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getMyServers, deleteMyServer } from '../../actions/server';

const styles = theme => ({
  content: {
    padding: theme.spacing(3),
    margin: '0px 25px 0px 25px',
  },
  divider: {
    paddingBottom: 25
  },
});

class ManagementPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serverFormOpen: false,
      type: TYPE.ADD,
    }
  }

  componentWillMount() {
    this.props.getMyServers();
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

          <MaterialTable
            title={'Mes serveurs'}
            style={{
              boxShadow: 'none',
              margin: '25px -24px -25px -24px',
            }}
            columns={[
              { title: 'Nom', field: 'name' },
              {
                title: 'Site',
                field: 'url',
                render: rowData => {
                  return <a href={rowData.url} target={'_blank'}>{rowData.url}</a>
                }
              },
              {
                title: 'Est actif',
                field: 'enable',
                render: rowData => {
                  // return <div>{rowData.enable ? 'oui' : 'non'}</div>
                  return <Switch
                    checked={rowData.enable}
                    color={'secondary'}
                  // onChange={handleChange('checkedA')}
                  />
                }
              },
            ]}
            actions={[
              {
                icon: 'save',
                tooltip: 'Gérer',
              },
              {
                icon: 'delete',
                tooltip: 'Supprimer',
                onClick: (event, rowData) => {
                  this.props.deleteMyServer(rowData);
                }
              }
            ]}
            options={{
              actionsColumnIndex: -1
            }}
            data={this.props.myServers}
            isLoading={this.props.myServers.length <= 0}
          />

        </Paper>

        <div className={classes.divider} />

        <DialogForm title={'Ajouter un serveur'} open={this.state.serverFormOpen} onClose={this.onCloseForm.bind(this)} maxWidth={'md'}>
          <ServerForm type={this.state.type} onClose={this.onCloseForm.bind(this)} />
        </DialogForm>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myServers: state.server.my_all
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getMyServers,
    deleteMyServer,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(requiredAuth()(withStyles(styles)(ManagementPage)));