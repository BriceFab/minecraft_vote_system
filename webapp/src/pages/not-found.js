import React, { Component } from "react";
import { withStyles, Typography } from "@material-ui/core";

const styles = theme => ({

});

class NotFoundPage extends Component {
    render() {
        const {location} = this.props;
        return (
            <Typography component="h2">
                La page <code>{location.pathname}</code> n'est pas disponible.
            </Typography>
        );
    }
}
export default withStyles(styles)(NotFoundPage);