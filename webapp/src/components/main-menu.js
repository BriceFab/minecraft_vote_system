import React, { Component } from "react";
import { withStyles, Drawer, Divider, ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core";
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const styles = theme => ({
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      toolbar: theme.mixins.toolbar,
});

/**
 * Menu principal
 */
class MainMenu extends Component {

    render() {
        const {classes} = this.props;

        return (
            <Drawer
            className={classes.drawer}
            variant={this.props.open ? 'permanent' : ''}
            classes={{
              paper: classes.drawerPaper,
            }}
            open={this.props.open}
          >
            <div className={classes.toolbar} />
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        );
    }

}
export default withStyles(styles)(MainMenu);