import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import {
    IconButton,
    Typography,
    Grid,
    withStyles
} from '@material-ui/core';
import styles from '../../theme/styles/loginStyle';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

class LoginLayout extends Component {

    handleBack() {
        this.props.history.push('/')
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid
                    className={classes.grid}
                    container>
                    <Grid
                        className={classes.quoteWrapper}
                        item
                        lg={5}>
                        <div className={classes.quote}>
                            <div className={classes.quoteInner}>
                                <Typography
                                    className={classes.quoteText}
                                    variant="h1">
                                    Informations
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid
                        className={classes.content}
                        item
                        lg={7}
                        xs={12}>
                        <div className={classes.content}>
                            <div className={classes.contentHeader}>
                                <IconButton
                                    className={classes.backButton}
                                    onClick={this.handleBack.bind(this)}
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                            </div>
                            <div className={classes.contentBody}>
                                {this.props.children}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(LoginLayout));