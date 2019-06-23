import React, { Component } from "react";
import { withStyles, AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import { fade } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MainMenu from './main-menu';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CONFIG from "../config";

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
    sectionBreak: {
        flexGrow: 1,
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
});

/**
 * Barre de l'application
 */
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
            <main>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="main-menu"
                            onClick={this.toggleMainMenu.bind(this)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            <Link color={'inherit'} component={RouterLink} to="/">{CONFIG.APP.NAME}</Link>
                        </Typography>
                        <div className={classes.sectionBreak} />

                        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>
                        
          <div className={classes.sectionBreak} />

                        
                        <Button color="inherit">Login</Button>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="main-menu"
                            onClick={this.toggleMainMenu.bind(this)}>
                            <AccountCircle />
                        </IconButton>

                    </Toolbar>
                </AppBar>
                <MainMenu open={this.state.mainMenuOpen} />
          </main>
        );
    }

}
export default withStyles(styles)(HeaderBar);