import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createLocation } from "../../actions/location";
import isEmpty from "is-empty";
import { connect } from "react-redux";
import InlineError from "../Messages/InlineErrors";
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
});
class create extends React.Component {
    state = {
        name: "",
        errorRequest: "",
        error: {}
    }


    handleChange = event => this.setState({ [event.target.name]: event.target.value });

    handleSubmit = event => {
        event.preventDefault();
        const error = this.validate(this.state.name);
        this.setState({ error })
        if (Object.keys(error).length === 0) {
            this.props.createLocation(this.state.name)
                .then(() => window.location.href = "/location")
                .catch(err => this.setState({ errorRequest: err.response.data.message }));
        }

    }
    validate = name => {
        const error = {};
        if (isEmpty(name.trim())) { error.name = "Location is required"; }
        return error;
    }
    render() {
        const { classes } = this.props;
        const { name, error, errorRequest } = this.state;
        return (
            <Fragment>
                <Typography variant="h4" gutterBottom>
                    Create Location
                    </Typography>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField
                        label="Location"
                        value={name}
                        name="name"
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <br />
                    {error.name ? <InlineError text={error.name} /> : null}
                    <br />
                    <Button type="submit" color="primary" variant="raised">
                        Create
                    </Button>
                    <br />
                    {errorRequest ? <InlineError text={errorRequest} /> : null}
                </form>

            </Fragment>
        );
    }
}
create.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(null, { createLocation })(withStyles(styles)(create));