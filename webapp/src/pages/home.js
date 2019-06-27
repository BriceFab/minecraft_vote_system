import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Button from '../templates/material-kit/components/CustomButtons/Button';

const styles = theme => ({

});

class HomePage extends Component {
    render() {
        return (
            <>
            Home page
                <Button color={'primary'}>material-kit-react</Button>
            </>
        );
    }
}
export default withStyles(styles)(HomePage);