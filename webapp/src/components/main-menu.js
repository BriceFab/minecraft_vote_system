import React, { Component } from "react";
import { withStyles, Drawer, Divider, ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import moment from 'moment';
import CONFIG from '../config';

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
      copyright: {
          textAlign: 'center'
      }
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
                open={this.props.open}>
                    <div className={classes.toolbar} />
                        <List>
                            {this.renderListItem(<HomeIcon />, 'Accueil')}
                            {this.renderListItem(<StarHalfIcon />, 'Serveurs')}
                            {this.renderListItem(<WhatshotIcon />, 'Promotion')}
                        </List>
                        <Divider />
                        <List>
                            {this.renderListItem(<ImportantDevicesIcon />, 'API vote', false)}
                            {this.renderListItem(<QuestionAnswerIcon />, 'Nous contacter', false)}
                        </List>
                        <List>
                            <ListItemText secondary={`© ${moment(new Date()).format('YYYY')} ${CONFIG.APP.NAME}`} className={classes.copyright} />
                        </List>
                </Drawer>
        );
    }

    renderListItem(icon, name, important = true) {
        return (
            <ListItem button key={`key-${name}`}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                {important && <ListItemText primary={name} />}
                {!important && <ListItemText secondary={name} />}
            </ListItem>
        );
    }

}
export default withStyles(styles)(MainMenu);