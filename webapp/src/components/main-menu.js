import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

class MainMenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
      const {classes} = this.props;

    return (
        <Drawer open={this.props.isOpen} onClose={this.props.closeMenu}>
              <div
              className={classes.list}
              role="main-menu"
              onClick={this.props.closeMenu}
              >
              <List>
                  <ListItem button key={'lien 1'}>
                      <ListItemIcon>
                        <MailIcon />  
                    </ListItemIcon>
                      <ListItemText primary={'lien 1'} />
                  </ListItem>
                    <Divider />
                  <ListItem button key={'lien 2'}>
                      <ListItemIcon> <InboxIcon /></ListItemIcon>
                      <ListItemText primary={'lien 2'} />
                  </ListItem>
              </List>
              </div>
        </Drawer>
    );
  }

}
export default withStyles(styles)(MainMenu);