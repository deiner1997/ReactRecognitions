import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import {cataloguecategory} from '../store';
import api from '../../api';
import { createCatalogue } from "../../actions/catalogue";
import isEmpty from "is-empty";
import { connect } from "react-redux";
import InlineError from "../Messages/InlineErrors";


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
    menu: {
        width: 300,
    },
});
class Create extends Component {
    constructor() {
        super();
        this.state = {
            listLocations: [],
            category: "",
            location:"",
            title:"",
            error:{},
            errorRequest: ""
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
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    handleSubmit = event => {
        event.preventDefault();
        const catalogue = {
            title: this.state.title,
            location:this.state.location,
            category: this.state.category
        }
        const error = this.validate(catalogue);
        this.setState({error})
        if (Object.keys(error).length === 0){
            this.props.createCatalogue(this.state.title,this.state.location,this.state.category)
                .then(() => window.location.href = "/catalogue")
                .catch(err => this.setState({ errorRequest: err.response.data.message }));
        }
    }
    validate = catalogue => {
        const error = {};
        if (isEmpty(catalogue.title.trim())) { error.title = "Title is required"; }
        if (isEmpty(catalogue.location)) { error.location = "Location is required"; }
        if (isEmpty(catalogue.category)) { error.category = "Category is required";  }
        return error;
    }
    render() {
        const { classes } = this.props;
        const {category, title, listLocations, location, error,errorRequest} = this.state
        return (
                <Fragment className={classes.paper}>
                    <Typography variant="h4" gutterBottom>
                       Create a new product
                    </Typography>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <br />
                        <TextField
                            label="Title"
                            name="title"
                            value={title}
                            className={classes.textField}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                         <br />
                        {error.title ? <InlineError text={error.title} /> : null}
                        <br />
                        <TextField
                            id="select-location"
                            select
                            label="Location"
                            name="location"
                            className={classes.textField}
                            value={location}
                            onChange={this.handleChange}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Please select the location"
                            margin="normal"
                        >
                            {listLocations.map(option => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br />
                        {error.location ? <InlineError text={error.location} /> : null}
                        <br />
                        <TextField
                            id="select-category"
                            select
                            label="Category "
                            name="category"
                            className={classes.textField}
                            value={category}
                            onChange={this.handleChange}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Please select the category"
                            margin="normal"
                        >
                            {cataloguecategory.map(option => (
                                <MenuItem key={option.category} value={option.category}>
                                    {option.category}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br />
                        {error.category ? <InlineError text={error.category} /> : null}
                        <br/>
                        <Button type="submit" color="primary" variant="raised">
                        Create
                        </Button>
                        <br />
                        {errorRequest ? <InlineError text={errorRequest} /> : null}
                    </form>
                    <br />
                </Fragment>
        );
    }
}
Create.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(null, { createCatalogue })(withStyles(styles)(Create));
