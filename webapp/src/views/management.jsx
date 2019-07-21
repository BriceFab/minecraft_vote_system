import React, { Component } from "react";
import { withStyles, Grid, Tooltip, Fab, Switch } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CONFIG from '../config';
import Layout from './layouts/layout';
import AddIcon from '@material-ui/icons/Add';
import MaterialTable from "material-table";
import DialogForm from "../templates/dialog-form";
import ServerForm from '../components/forms/server';
import TYPE from '../components/constants/modal';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getMyServers, deleteMyServer, editMyServer } from '../actions/server';
import requiredAuth from '../services/required-auth';

const styles = theme => ({
    root: {
        padding: theme.spacing(4)
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
                    <link rel="canonical" href={`${CONFIG.APP.FULL_URL}/management`} />
                    <meta charSet="utf-8" />
                    <meta name="description" content="TODO" />
                    <meta name="keywords" cpntent="TODO" />
                </Helmet>

                <Layout title={'Gestion de mon compte'}>
                    <div className={classes.root}>

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
                                            onChange={(event, checked) => {
                                                rowData.enable = checked;
                                                this.props.editMyServer(rowData);
                                            }}
                                        />
                                    }
                                },
                                { title: 'Description', field: 'description' },
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
                                actionsColumnIndex: -1,
                                columnsButton: true,
                                exportAllData: true,
                                exportButton: true,
                                exportDelimiter: ';',
                                filtering: true,
                                pageSize: 3,
                                pageSizeOptions: [3, 5, 10]
                            }}
                            data={this.props.myServers}
                        />

                        <div className={classes.divider} />

                        <DialogForm title={'Ajouter un serveur'} open={this.state.serverFormOpen} onClose={this.onCloseForm.bind(this)} maxWidth={'md'}>
                            <ServerForm type={this.state.type} onClose={this.onCloseForm.bind(this)} />
                        </DialogForm>

                        Home<br />
                    </div>
                </Layout>
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
        editMyServer,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(requiredAuth()(withStyles(styles)(ManagementPage)));