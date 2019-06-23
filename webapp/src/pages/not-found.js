import React, { Component } from "react";
import { withStyles, Typography } from "@material-ui/core";

const styles = theme => ({

});

class NotFoundPage extends Component {
    render() {
        const {location} = this.props;
        return (
            <main>
                <Typography component="h2">
                    La page <code>{location.pathname}</code> n'est pas disponible.
                </Typography>
            </main>
        );
    }
}
export default withStyles(styles)(NotFoundPage);