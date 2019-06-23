import React, { Component } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import MainMenu from '../components/main-menu';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  account: {
      fontSize: 38,
  },
  menu: {
      fontSize: 32,
  },
});

class HeaderBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      isMainMenuOpen: false, 
    }
  }

  handleProfileMenuOpen(event) {
    this.setAnchorEl(event.currentTarget);
  }

  handleMobileMenuClose() {
    this.setMobileMoreAnchorEl(null);
  }

  handleMenuClose() {
    this.setAnchorEl(null);
    this.handleMobileMenuClose();
  }

  setAnchorEl(val) {
    this.setState({anchorEl: val})
  }

  setMobileMoreAnchorEl(val) {
    this.setState({mobileMoreAnchorEl: val})
  }

  setMainMenuOpen(open) {
    this.setState({
      isMainMenuOpen: open
    })
  }

  handleMobileMenuOpen(event) {
    this.setMobileMoreAnchorEl(event.currentTarget);
  }

  openMainMenu() {
    this.setState({
      isMainMenuOpen: true
    })
  }

  closeMainMenu() {
    this.setState({
      isMainMenuOpen: false
    })
  }

  render() {
    const {classes} = this.props;

    const isMenuOpen = Boolean(this.state.anchorEl);
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={'main-menu'}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose.bind(this)}
      >
        <MenuItem onClick={this.handleMenuClose.bind(this)}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose.bind(this)}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={'main-menu-mobile'}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={this.state.isMobileMenuOpen}
        onClose={this.handleMobileMenuClose.bind(this)}
      >
        <MenuItem>
          <IconButton aria-label="Show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="Show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen.bind(this)}>
          <IconButton
            aria-label="Account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
            onClick={this.openMainMenu.bind(this)}
          >
            <MenuIcon className={classes.menu} />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            servers-ranking
          </Typography>
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
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="Account of current user"
              aria-controls={'main-menu'}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen.bind(this)}
              color="inherit"
            >
              <AccountCircle className={classes.account} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="Show more"
              aria-controls={'main-menu-mobile'}
              aria-haspopup="true"
              onClick={this.handleMobileMenuOpen.bind(this)}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <MainMenu isOpen={this.state.isMainMenuOpen} closeMenu={this.closeMainMenu.bind(this)} />
    </div>
    );

  }

}
export default withStyles(styles)(HeaderBar);