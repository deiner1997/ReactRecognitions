import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import "./css/main.css";
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: "#2f2d46",
    
  },
  footer: {
    width: '100%',
    textAlign: 'center',
    position: 'fixed',
    bottom: '0px',
  },
  typography:{
    color: "white"
  }

});
class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <Paper className={classes.root} elevation={1}>
          <Typography className={classes.typography} component="p">
          &#169;2019 All right reserved
        </Typography>
        </Paper>
      </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);