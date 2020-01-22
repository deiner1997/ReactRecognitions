import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import MenuItem from '@material-ui/core/MenuItem';
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import DoneOutline from '@material-ui/icons/DoneOutline';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountBox from '@material-ui/icons/AccountBox';
import EventNote from '@material-ui/icons/EventNote';
import DateRange from '@material-ui/icons/DateRange';
import LocationCity from '@material-ui/icons/LocationCity';
import LocalPlay from '@material-ui/icons/LocalPlay'
import CardGiftcard from '@material-ui/icons/CardGiftcard'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppinCart from '@material-ui/icons/ShoppingCart'
import isEmpty from "is-empty";
import "./css/main.css";
const drawerWidth = 240;
const styles = withStyles((theme: Theme) =>
  createStyles({
    root: {

      position: 'absolute'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    grow: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));
const Info = props => {
  if (props.loadingUser) {
    return (
      <Fragment>
        <div className={props.classes.grow} />
        <IconButton
         className="menu-appbar"
          aria-label="Account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={props.handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={props.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={props.open}
          onClose={props.handleClose}
        >
          <MenuItem component={Link} id="logout" onClick={props.handleLogout} >Logout<ExitToApp /></MenuItem>
          <MenuItem component={Link} id="my-account" to="/my-account" onClick={props.handleClose}>My account<AccountBox /></MenuItem>
        </Menu>
      </Fragment>
    )
  } else {
    return null;
  }
}
const Logged = props => {
  if (props.loadingUser) {
    return (

      <Fragment>
        <ListItem button component={Link} onClick={props.handleDrawerClose} to="/create-recognition">
          <ListItemIcon><LocalPlay /></ListItemIcon>
          <ListItemText primary="Recognition" />
        </ListItem>
        <ListItem button component={Link} onClick={props.handleDrawerClose} to="/report">
          <ListItemIcon><EventNote /></ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button component={Link} onClick={props.handleDrawerClose} to="/shopping">
          <ListItemIcon><ShoppinCart /></ListItemIcon>
          <ListItemText primary="Shopping" />
        </ListItem>
        <Approve
          user={props.user}
          classes={props.classes}
          loadingUser={props.loadingUser}
          handleDrawerClose={props.handleDrawerClose}
        />
      </Fragment>
    );
  } else {
    return null
  }
};
const Approve = props => {
  if (!isEmpty(props.user[0])) {
    if (props.user[0].Role._id === "5ce9b43f7a794235b4265f16" && props.loadingUser) {
      return (
        <Fragment>
          <ListItem button component={Link} onClick={props.handleDrawerClose} to="/approve">
            <ListItemIcon><DoneOutline /></ListItemIcon>
            <ListItemText primary="Approve" />
          </ListItem>
          <ListItem button component={Link} onClick={props.handleDrawerClose} to="/catalogue">
            <ListItemIcon><CardGiftcard /></ListItemIcon>
            <ListItemText primary="Catalogue" />
          </ListItem>
          <ListItem button component={Link} onClick={props.handleDrawerClose} to="/register">
            <ListItemIcon><AccountBox /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} onClick={props.handleDrawerClose} to="/location">
            <ListItemIcon><LocationCity /></ListItemIcon>
            <ListItemText primary="Location" />
          </ListItem>
          <ListItem button component={Link} onClick={props.handleDrawerClose} to="/period">
            <ListItemIcon><DateRange /></ListItemIcon>
            <ListItemText primary="Period" />
          </ListItem>
          <ListItem button component={Link} onClick={props.handleDrawerClose} to="/queries">
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText primary="Queries" />
          </ListItem>
        </Fragment>
      );
    }
    return null;
  }
  return null;
};
class Header extends Component {
  state = {
    anchorEl: null,
    setOpen: null
  };
  handleDrawerOpen = () => {
    this.setState({ setOpen: true })
  }

  handleDrawerClose = () => {
    this.setState({ setOpen: null })
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleLogout = () => {
    this.props.logout();
    window.location.href = "/login";
  }


  render() {
    const { classes, loadingUser, user } = this.props;
    const { anchorEl, setOpen } = this.state;
    const open = Boolean(anchorEl);
    const openMenu = Boolean(setOpen);
    return (
      <Fragment className="header-position" >
        <CssBaseline />
        <AppBar className={clsx(classes.appBar, {
          [classes.appBarShift]: openMenu,
          
        })}>
          <Toolbar className="header-color">
            <IconButton onClick={this.handleDrawerOpen} edge="start" className={clsx(classes.menuButton, openMenu && classes.hide)} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <ListItem >
              {loadingUser ?
                <Link to="/dashboard" >
                  <img alt="Logo Avantica" src="https://jira.avantica.net/s/r8x5yu/72005/f2677366752d4415e515df13f3d5dc88/_/jira-logo-scaled.png"></img>
                </Link>
                :
                 <Button color="primary" variant="contained" className={classes.button} component={Link} id="login-page" to="/login">Login</Button>
              }
            </ListItem>
            <Info
              handleLogout={this.handleLogout}
              open={open}
              classes={classes}
              anchorEl={anchorEl}
              handleClose={this.handleClose}
              handleMenu={this.handleMenu}
              loadingUser={loadingUser}
            />
          </Toolbar>
        </AppBar>
        {loadingUser === true ?
          <Drawer
            onClick={this.handleDrawerClose}
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={openMenu}
            classes={{
              paper: classes.drawerPaper,
            }}

          >
            <div className={classes.drawerHeader}>
              <Typography variant="h6" gutterBottom>
                Avantica
             <IconButton onClick={this.handleDrawerClose}>
                  {setOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </Typography>
            </div>
            <List component="nav" >
              <Logged
                loadingUser={loadingUser}
                classes={classes}
                user={user}
                handleDrawerClose={this.handleDrawerClose}
              />
            </List>
          </Drawer>
          : <Link to="/login" />
        }
      </Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return { user: state.auth };
}
export default connect(mapStateToProps, { logout })(withStyles(styles)(Header));