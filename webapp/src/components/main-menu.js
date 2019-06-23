import React, { Component } from "react";
import { withStyles, Drawer, Divider, ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core";
import MailIcon from '@material-ui/icons/Mail';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
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
                        {['Accueil', 'Serveurs', 'Promotion'].map((text, index) => (
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
                            <ListItem button key={'contact'}>
                            <ListItemIcon>
                                <QuestionAnswerIcon />
                            </ListItemIcon>
                            <ListItemText secondary={'Nous contacter'} />
                            </ListItem>
                        </List>
                        <List>
                            <ListItemText secondary={`© ${moment(new Date()).format('YYYY')} ${CONFIG.APP.NAME}`} className={classes.copyright} />
                        </List>
                </Drawer>
        );
    }

}
export default withStyles(styles)(MainMenu);