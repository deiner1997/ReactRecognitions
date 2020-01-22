import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import InlineError from "../Messages/InlineErrors";
import isEmpty from "is-empty";
import api from "../../api"

const styles = theme => ({
    colorbutton: {
        color: "red"
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
    menu: {
        width: 300,
    },
});
class edit extends Component {
    constructor() {
        super();
        this.state = {
            Position: "",
            Location: "",
            Area: "",
            Role: "",
            email: "",
            username: "",
            _id: "",
            name: "",
            error: {},
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
                console.log(err)
                this.setState({ errorRequest: err.response.data.message })
            });
        api.area.getAreas()
            .then(data => {
                this.setState({ listArea: data.areas })
            })
            .catch(err => {
                console.log(err)
                this.setState({ errorRequest: err.response.data.message })
            }); api.role.getRoles()
                .then(data => {
                    this.setState({ listRole: data.roles })
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ errorRequest: err.response.data.message })
                }); api.position.getPositions()
                    .then(data => {
                        this.setState({ listPosition: data.positions })
                    })
                    .catch(err => {
                        console.log(err)
                        this.setState({ errorRequest: err.response.data.message })
                    });
        api.user.getUserById(this.props.match.params.id)
            .then(data => {
                this.setState({
                    Position: data.user.Position._id, Location: data.user.Location._id, Area: data.user.Area._id, Role: data.user.Role._id,
                    email: data.user.email, name: data.user.name, username: data.user.username, _id: data.user._id
                })
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    }
    handleChange = event => this.setState({ [event.target.name]: event.target.value });

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            _id: this.state._id,
            email: this.state.email,
            username: this.state.username,
            name:this.state.name, 
            Role: this.state.Role,
            Position:this.state.Position,
            Area: this.state.Area,
            Location: this.state.Location
        }
        const error = this.validate(user);
        this.setState({ error })
        if (Object.keys(error).length === 0) {
            api.user.updateUser(this.state._id,this.state.name.toUpperCase(), this.state.Role,this.state.Position ,this.state.Area ,this.state.Location)
                .then(() => window.location.href = "/register")
                .catch(err => this.setState({ errorRequest: err.response.data.message }));
        }

    }

    validate = user => {
        const error = {};
        if (isEmpty(user.name.trim())) { error.name = "Name is required"; }
        if (isEmpty(user.Role)) { error.role = "Role is required"; }
        if (isEmpty(user.Area)) { error.area = "Area is required"; }
        if (isEmpty(user.Position)) { error.position = "Position is required"; }
        if (isEmpty(user.Location)) { error.location = "Location is required"; }
        return error;
    }
    render() {
        const { classes } = this.props;
        const { name, username, email, Role, Location, Position, Area, error, errorRequest } = this.state
        return (
                <Fragment className={classes.paper}>
                    <Typography variant="h4" gutterBottom>
                        Update
                    </Typography>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <TextField
                            disabled
                            label="Email"
                            value={email}
                            className={classes.textField}

                            margin="normal"
                        />
                        <br />
                        {error.email ? <InlineError text={error.email} /> : null}
                        <br />
                        <TextField
                            disabled
                            label="Username"
                            value={username}
                            className={classes.textField}
                            margin="normal"
                        />
                        <br />
                        {error.username ? <InlineError text={error.username} /> : null}
                        <br />
                        <TextField
                            label="Name"
                            value={name}
                            name="name"
                            className={classes.textField}
                            margin="normal"
                            onChange= {this.handleChange}
                        />
                        <br />
                        {error.name ? <InlineError text={error.name} /> : null}
                        <br />
                        <TextField
                            id="select-position"
                            select
                            label="Position"
                            name="Position"
                            value={Position}
                            className={classes.textField}
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
                            value={Role}
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
                            value={Location}
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
                            value={Area}
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
edit.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(edit)