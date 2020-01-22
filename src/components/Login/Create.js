import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InlineError from "../Messages/InlineErrors";
import { login } from "../../actions/auth";
import isEmpty from "is-empty"
import { connect } from "react-redux";
const styles = theme => ({
    colorbutton: {
        color: "red"
    },
    root: {

        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
});
class Create extends Component {
    state = {
        user: { email: "", password: "" },
        error: {},
        errorRequest: "",
        loading: false
    }

    handleChange = event => this.setState({ user: { ...this.state.user, [event.target.name]: event.target.value } });

    handleSubmit = event => {
        event.preventDefault();
        const error = this.validate(this.state.user);
        this.setState({ error })
        if (Object.keys(error).length === 0) {
            this.setState({ loading: true });
            this.props.login(this.state.user.email, this.state.user.password)
                .then(() => window.location.href = "/dashboard")
                .catch(err => this.setState({ errorRequest: err.response.data.message, loading: false }));
        }

    }
    validate = user => {
        const error = {};
        if (isEmpty(user.email)) { error.email = "Invalid email"; }
        if (isEmpty(user.password)) { error.password = "Can't be blank"; }
        return error
    }
    render() {
        const { classes } = this.props;
        const { user, loading, error, errorRequest } = this.state;
        const token = window.localStorage.getItem('jwt');
        if (isEmpty(token)) {
            return (
                <Fragment className={classes.paper}>
                    <Typography variant="h4" gutterBottom id="login-page-load">
                        Sign in
                        </Typography>
                    <form autoComplete="off" onSubmit={this.handleSubmit} loading={loading}>
                        <TextField
                            label="Username or Email"
                            name="email"
                            value={user.email}
                            className={classes.textField}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                        <br />
                        {error.email ? <InlineError text={error.email} /> : null}
                        <TextField
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            label="Password"
                            className={classes.textField}
                            value={user.password}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                        <br />
                        {error.password ? <InlineError text={error.password} /> : null}
                        <Button name="Login" type="submit" color="primary" variant="raised">
                            Sign in
                            </Button>
                        {errorRequest && <InlineError text={errorRequest} />}
                    </form>
                    <br />
                </Fragment>
            );
        } else {
            window.location.href = "/dashboard";
        }

    }
}
Create.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(null, { login })(withStyles(styles)(Create));