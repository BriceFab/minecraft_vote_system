import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CONFIG from '../config';
// import i18next from 'i18next';
import { Dashboard as DashboardLayout } from '../theme/layouts';

const styles = theme => ({

});

class HomePage extends Component {
    render() {
        return (
            <DashboardLayout title="Dashboard">
                <Helmet>
                    <title>{CONFIG.APP.NAME} - Accueil</title>
                    <link rel="canonical" href={`${CONFIG.APP.FULL_URL}/accueil`} />
                    <meta charSet="utf-8" />
                    <meta name="description" content="TODO" />
                    <meta name="keywords" cpntent="TODO" />
                </Helmet>

                Home page<br />
                todo
                {/* {i18next.t('key')} */}
            </DashboardLayout>
        );
    }
}
export default withStyles(styles)(HomePage);