import React, { Component } from "react";
import { withStyles, IconButton } from "@material-ui/core";
import {
    Person
} from '@material-ui/icons';
import styles from '../../theme/styles/top-bar-actionsStyle';
import { connect } from 'react-redux';

class TopBarActions extends Component {
    render() {
        const { classes } = this.props;
        return (
            <>
                <IconButton
                    onClick={this.handleSignOut}
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

export default connect(mapStateToProps)(withStyles(styles)(TopBarActions));