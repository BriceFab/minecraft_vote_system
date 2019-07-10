import React, { Component } from "react";
import { withStyles, IconButton } from "@material-ui/core";
import {
    Person
} from '@material-ui/icons';
import styles from '../../theme/styles/top-bar-actionsStyle';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TopBarActions extends Component {

    redirectLogin() {
        this.props.history.push('/login');
    }

    render() {
        const { classes, loggedIn } = this.props;

        return (
            <>
                <IconButton
                    onClick={loggedIn ? () => {console.log('show drop')} : this.redirectLogin.bind(this)}
                    size={'medium'}>
                    <Person className={classes.account} />
                </IconButton>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn && state.user.token,
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(TopBarActions)));