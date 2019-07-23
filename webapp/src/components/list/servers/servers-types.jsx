import React, { Component } from 'react';
import { withStyles, AppBar, Tab, Tabs } from '@material-ui/core';
import styles from '../../../theme/styles/servers-typesStyle';
import Icon from '@material-ui/core/Icon';

class ServersTypes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        }
    }

    handleChange() {
        this.setState({ value: 'folder' })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color={'white'}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="secondary"
                        textColor="secondary"
                        centered>
                        <Tab label="Item Seven" icon={<Icon>folder</Icon>} />
                    </Tabs>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(ServersTypes);