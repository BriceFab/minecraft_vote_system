import React, { Component } from "react";
import { withStyles, AppBar, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
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
import { withRouter } from 'react-router-dom';

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
            mainMenuOpen: true,
            profileMenuAnchorEl: null
        }
    }

    toggleMainMenu() {
        this.setState({mainMenuOpen: !this.state.mainMenuOpen})
    }

    openProfileMenu(e) {
        //TODO USER NOT CONNECTED CHECK
        if (true) {
            this.props.history.push('/account');
        } else {
            this.setState({profileMenuAnchorEl: e.currentTarget});
        }
    }

    closeProfileMenu() {
        this.setState({profileMenuAnchorEl: null});
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
                                inputProps={{ 'aria-label': 'Search' }} />
                        </div>
                        
                        <div className={classes.sectionBreak} />

                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="main-menu"
                            onClick={this.openProfileMenu.bind(this)}>
                            <AccountCircle />
                        </IconButton>

                    </Toolbar>
                </AppBar>

                <MainMenu open={this.state.mainMenuOpen} />
                <Menu
                    id="profile-menu"
                    anchorEl={this.state.profileMenuAnchorEl}
                    keepMounted
                    open={Boolean(this.state.profileMenuAnchorEl)}
                    onClose={this.closeProfileMenu.bind(this)}>
                        <MenuItem onClick={this.closeProfileMenu.bind(this)}>Profile</MenuItem>
                        <MenuItem onClick={this.closeProfileMenu.bind(this)}>Logout</MenuItem>
                </Menu>
          </main>
        );
    }

}
export default withRouter(withStyles(styles)(HeaderBar));