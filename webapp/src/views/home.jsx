import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CONFIG from '../config';
import Layout from './layouts/layout';

const styles = theme => ({
    root: {
        padding: theme.spacing(4)
    },
});

class HomePage extends Component {
    render() {
        const { classes } = this.props;
        return (
            <>
                <Helmet>
                    <title>{CONFIG.APP.NAME} - Accueil</title>
                    <link rel="canonical" href={`${CONFIG.APP.FULL_URL}/accueil`} />
                    <meta charSet="utf-8" />
                    <meta name="description" content="TODO" />
                    <meta name="keywords" cpntent="TODO" />
                </Helmet>

                <Layout title={'Accueil'}>
                    <div className={classes.root}>


                        Home page<br />
                    </div>
                </Layout>
            </>
        );
    }
}
export default withStyles(styles)(HomePage);