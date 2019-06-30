import React, { Component } from "react";
import { withStyles, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CONFIG from '../../config';

const styles = theme => ({

});

class NotFoundPage extends Component {
    render() {
        const { location } = this.props;
        return (
            <>
                <Helmet>
                    <title>{CONFIG.APP.NAME}</title>
                    <link rel="canonical" href={`${CONFIG.APP.FULL_URL}/`} />
                    <meta charSet="utf-8" />
                </Helmet>

                <Typography component="h2">
                    La page <code>{location.pathname}</code> n'est pas disponible.
                </Typography>
            </>
        );
    }
}
export default withStyles(styles)(NotFoundPage);