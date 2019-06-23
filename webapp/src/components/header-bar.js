import React, { Component } from "react";
import { withStyles, AppBar, Toolbar, IconButton } from "@material-ui/core";

import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MainMenu from './main-menu';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
      toolbar: theme.mixins.toolbar,
});
class HeaderBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mainMenuOpen: true
        }
    }

    toggleMainMenu() {
        this.setState({mainMenuOpen: !this.state.mainMenuOpen})
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
              <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.toggleMainMenu.bind(this)}
                >
                  <MenuIcon className={classes.menu} />
                </IconButton>
                <Typography variant="h6" noWrap>
                  Clipped drawer
                </Typography>
              </Toolbar>
            </AppBar>
            <MainMenu open={this.state.mainMenuOpen} />
          </div>
        );
    }

}
export default withStyles(styles)(HeaderBar);