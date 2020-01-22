import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Validator from "validator";
import InlineError from "../Messages/InlineErrors";
import { register } from "../../actions/register";
import isEmpty from "is-empty";
import api from "../../api"
import { connect } from "react-redux";

const styles = theme => ({
    colorbutton: {
        color: "red"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
    menu: {
        width: 300,
    },
});
class Create extends Component {
    constructor() {
        super();
        this.state = {
            user:{Position: "",Location: "",Area: "",Role: "",email: "",username: "",password: "",repeat: "",name: ""},
            error:{},
            errorRequest: "",
            listLocations: [],
            listArea: [],
            listRole: [],
            listPosition: []
        }
    }
    componentWillMount() {
        api.location.getlocations()
            .then(data => {
                this.setState({ listLocations: data.locations })
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
        api.area.getAreas()
            .then(data => {
                this.setState({ listArea: data.areas })
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            }); api.role.getRoles()
                .then(data => {
                    this.setState({ listRole: data.roles })
                })
                .catch(err => {
                    this.setState({ errorRequest: err.response.data.message })
                }); api.position.getPositions()
                    .then(data => {
                        this.setState({ listPosition: data.positions })
                    })
                    .catch(err => {
                        this.setState({ errorRequest: err.response.data.message })
                    });
    }
    handleChange = event => this.setState({  user: { ...this.state.user, [event.target.name]: event.target.value }    });
    
    handleSubmit = event => {
        event.preventDefault();
        const error = this.validate(this.state.user);
        this.setState({error})
        if (Object.keys(error).length === 0){
            this.props.register(this.state.user.email, this.state.user.username, this.state.user.name.toUpperCase(), this.state.user.password,
                 this.state.user.Role, this.state.user.Position, this.state.user.Area, this.state.user.Location)
                .then(() => window.location.href = "/register")
                .catch(err => this.setState({ errorRequest: err.response.data.message }));
        }
       
    }
    
    validate = user => {
        const error = {};
        if(user.password !== user.repeat) { error.password= "Passwords are different" }
        if (isEmpty(user.name.trim())) { error.name = "Name is required"; }
        if (isEmpty(user.username.trim())) { error.username = "Username is required"; }
        if (isEmpty(user.email) || !Validator.isEmail(user.email)) { error.email = "Invalid email";  }
        if (isEmpty(user.password.trim())) { error.password = "Password is required";  }
        if (isEmpty(user.Role)) { error.role = "Role is required";  }
        if (isEmpty(user.Area)) { error.area = "Area is required";  }
        if (isEmpty(user.Position)) { error.position = "Position is required"; }
        if (isEmpty(user.Location)) { error.location = "Location is required"; }
        return error;
    }
    render() {
        const { classes } = this.props;
        const {user,error, errorRequest} =this.state
        return (
                <Fragment>
                    <Typography variant="h4" gutterBottom>
                            Register
                    </Typography>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <TextField
                            label="Email"
                            className={classes.textField}
                            name="email"
                            value={user.email}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                        <br />
                        {error.email ? <InlineError text={error.email} /> : null}
                        <br />
                        <TextField
                            label="Username"
                            name="username"
                            className={classes.textField}
                            value={user.username}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                        <br />
                        {error.username ? <InlineError text={error.username} /> : null}
                        <br />
                        <TextField
                            label="Name"
                            className={classes.textField}
                            name="name"
                            value={user.name}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                        <br />
                        {error.name ? <InlineError text={error.name} /> : null}
                        <br />
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
                        <br />
                        <TextField
                             type="password"
                            name="repeat"
                            autoComplete="current-password"
                            label="Repeat Password"
                            className={classes.textField}
                            value={user.repeat}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                        <br />
                        {error.password ? <InlineError text={error.password} /> : null}
                        <br />
                        <TextField
                            id="select-position"
                            select
                            label="Position"
                            name="Position"
                            className={classes.textField}
                            value={user.Position}
                            onChange={this.handleChange}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Please select the position"
                            margin="normal"
                        >
                            {this.state.listPosition.map(option => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br />
                        {error.position ? <InlineError text={error.position} /> : null}
                        <br />
                        <TextField
                            id="select-role"
                            select
                            label="Role"
                            name="Role"
                            className={classes.textField}
                            value={user.Role}
                            onChange={this.handleChange}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Please select the role"
                            margin="normal"
                        >
                            {this.state.listRole.map(option => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br />
                        {error.role ? <InlineError text={error.role} /> : null}
                        <br />
                        <TextField
                            id="select-location"
                            select
                            label="Location"
                            name="Location"
                            className={classes.textField}
                            value={user.Location}
                            onChange={this.handleChange}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Please select the location"
                            margin="normal"
                        >
                            {this.state.listLocations.map(option => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br />
                        {error.location ? <InlineError text={error.location} /> : null}
                        <br />
                        <TextField
                            id="select-area"
                            select
                            label="Area "
                            name="Area"
                            className={classes.textField}
                            value={user.Area}
                            onChange={this.handleChange}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Please select the area"
                            margin="normal"
                        >
                            {this.state.listArea.map(option => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br />
                        {error.area ? <InlineError text={error.area} /> : null}
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
Create.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(null, { register })(withStyles(styles)(Create));