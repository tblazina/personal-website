import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Emoji } from 'emoji-mart';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Motorcycle from '@material-ui/icons/Motorcycle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Person from '@material-ui/icons/Person';
import ListAlt from '@material-ui/icons/ListAlt';

// const MainWrapper = styled.div`
//   margin-top: 5vw;
//   margin-left: 10vw;
// `;
const StyledTypography = styled(Typography)`
  padding: 10px;
`;

const drawerWidth = 150;

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: '0px',
  },
  appBar: {
    backgroundColor: '#209CEE',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    fontSize: '16px',
    marginTop: '100px',
  },
});

class App extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { theme, classes, children } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <StyledTypography variant="h4" color="inherit">
              Tim Blazina
            </StyledTypography>
            <Emoji emoji={{ id: 'rocket' }} size={18} />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose,
            ),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component={Link} to="/" key="posts">
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="Posts" />
            </ListItem>
          </List>
          <List>
            <ListItem button component={Link} to="/about-me" key="person">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="About Me" />
            </ListItem>
          </List>
          <List>
            <ListItem button component={Link} to="/photos" key="photos">
              <ListItemIcon>
                <PhotoCamera />
              </ListItemIcon>
              <ListItemText primary="Photos" />
            </ListItem>
          </List>
          <List>
            <ListItem
              button
              component={Link}
              to="/my-strava-data"
              key="my-strava-data"
            >
              <ListItemIcon>
                <Motorcycle />
              </ListItemIcon>
              <ListItemText primary="My Strava Data" />
            </ListItem>
          </List>
          <List>
            <ListItem button component={Link} to="/contact" key="contact">
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
            <Divider />
            <ListItem
              button
              component="a"
              href="https://www.github.com/tblazina"
              target="_blank"
              key="Github"
            >
              <img
                height="24"
                width="24"
                alt="github"
                src="https://unpkg.com/simple-icons@latest/icons/github.svg"
              />
            </ListItem>
            <ListItem
              button
              component="a"
              href="https://www.linkedin.com/in/tim-blazina"
              target="_blank"
              key="linkedin"
            >
              <img
                height="24"
                width="24"
                alt="linkedin"
                src="https://unpkg.com/simple-icons@latest/icons/linkedin.svg"
              />
            </ListItem>
            <ListItem
              button
              component="a"
              href="https://stackoverflow.com/users/4120499/tblaz"
              target="_blank"
              key="stackoverflow"
            >
              <img
                height="24"
                width="24"
                alt="stackoverflow"
                src="https://unpkg.com/simple-icons@latest/icons/stackoverflow.svg"
              />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>{children}</main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
)(App);
