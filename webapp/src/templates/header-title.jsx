import React, { Component } from "react";
import { withStyles, Paper, Typography } from "@material-ui/core";
import headerBackground from '../assets/img/banner2.jpg';

const styles = theme => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: '0px 25px 25px 25px',
        backgroundImage: `url(${headerBackground})`,
    },
    divider: {
        paddingTop: 25
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.8rem',
        textAlign: 'center'
    }
});

class HeaderTitle extends Component {
    render() {
        const { classes, title } = this.props;

        return (
            <>
                <div className={classes.divider} />

                <Paper className={classes.root}>
                    <Typography className={classes.title} variant={'h4'} component={'h1'}>
                        {title.toUpperCase()}
                    </Typography>
                </Paper>
            </>
        );
    }
}
export default (withStyles(styles)(HeaderTitle));