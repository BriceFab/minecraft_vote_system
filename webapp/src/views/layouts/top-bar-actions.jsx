import React, { Component } from "react";
import { withStyles, IconButton, Menu, MenuItem } from "@material-ui/core";
import { Person } from '@material-ui/icons';
import styles from '../../theme/styles/top-bar-actionsStyle';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TopBarActions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null
        }
    }

    redirectLogin() {
        this.props.history.push('/login');
    }


    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose() {
        this.setState({ anchorEl: null });
    }

    openPage(route = '/login') {
        this.props.history.push(route);
    }

    render() {
        const { classes, loggedIn } = this.props;

        return (
            <>
                <IconButton
                    onClick={loggedIn ? this.handleClick.bind(this) : () => this.openPage()}
                    size={'medium'}>
                    <Person className={classes.account} />
                </IconButton>

                <Menu
                    id={'top-bar-actions-menu'}
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose.bind(this)}>
                    <MenuItem onClick={() => this.openPage('/management')}>Management</MenuItem>
                    <MenuItem onClick={() => this.openPage('/crediter')}>Crediter</MenuItem>
                    <MenuItem onClick={() => this.openPage('/profil')}>Mon profil</MenuItem>
                    <MenuItem onClick={() => this.openPage('/logout')}>Déconnexion</MenuItem>
                </Menu>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn && state.user.token,
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(TopBarActions)));