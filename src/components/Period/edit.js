import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import isEmpty from "is-empty";
import { connect } from "react-redux";
import InlineError from "../Messages/InlineErrors";
import { createPeriod } from "../../actions/period";
import moment from "moment"
import api from "../../api"
const styles = theme => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',

    },
});
class create extends React.Component {
    constructor() {
        super();
        this.state = {
            _id: "",
            status:true,
            startdate:"",
            enddate:"",
            name:"",
            error: {},
            errorRequest: ""
        }
    }
    componentDidMount() {
        api.period.getPeriodById(this.props.match.params.id)
            .then(data => {
                var startdate = new Date(data.period.startdate);
                startdate = moment.utc(startdate).format("YYYY-MM-DD");
                var enddate = new Date(data.period.enddate);
                enddate = moment.utc(enddate).format("YYYY-MM-DD");
                this.setState({ _id: data.period._id,name: data.period.name, startdate:startdate, enddate: enddate, status: data.period.status })
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    }
    handleChangeStatus = event => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    handleChange = event => this.setState({  [event.target.name]: event.target.value });
    handleSubmit = event => {
        event.preventDefault();
        const period = {
            name: this.state.name,
            status: this.state.status,
            startdate: this.state.startdate,
            enddate: this.state.enddate
        }
        const error = this.validate(period);
        this.setState({ error })
        if (Object.keys(error).length === 0) {
            var startdate = new Date(this.state.startdate);
            startdate = moment.utc(startdate).format("YYYY-MMMM-DD");
            var enddate = new Date(this.state.enddate);
            enddate = moment.utc(enddate).format("YYYY-MMMM-DD");
            var name = startdate + " - " + enddate;
            api.period.updatePeriod(this.state._id,name,this.state.startdate, this.state.enddate,this.state.status)
                .then(() => window.location.href = "/period")
                .catch(err => this.setState({ errorRequest: err.response.data.message }));
        }

    }
    validate = period => {
        const error = {};
        if (isEmpty(period.name)) { error.name = "Name is required"; }
        if (isEmpty(period.startdate)) { error.startdate = "Start date is required"; }
        if (isEmpty(period.enddate)) { error.enddate = "End date is required"; }
        if (isEmpty(period.status)) { error.status = "Status is required"; }
        return error;
    }
    render() {
        const { classes } = this.props;
        const { status, startdate, enddate, name, error, errorRequest } = this.state
        return (
                <Fragment className={classes.root}>
                    <Typography variant="h4" gutterBottom>
                        Update Period
                    </Typography>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <TextField
                            name="name"
                            disabled
                            value={name}
                            margin="normal"
                        />
                        <br />
                        {error.name ? <InlineError text={error.name} /> : null}
                        <br />
                        <TextField
                            id="startdate"
                            type="date"
                            name="startdate"
                            defaultValue={startdate}
                            value={startdate}
                            onChange={this.handleChange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        {error.startdate ? <InlineError text={error.startdate} /> : null}
                        <br />
                        <TextField
                            id="enddate"
                            label="End period"
                            type="date"
                            name="enddate"
                            defaultValue={enddate}
                            value={enddate}
                            onChange={this.handleChange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        {error.enddate ? <InlineError text={error.enddate} /> : null}
                        <br />
                        <FormControlLabel
                            control={
                                <Switch
                                    color="primary"
                                    checked={status}
                                    onChange={this.handleChangeStatus}
                                    value={status}
                                    name="status"
                                />
                            }
                            label="Status"
                        />
                        <br />
                        {error.status ? <InlineError text={error.status} /> : null}
                        <br />
                        <Button type="submit" color="primary" variant="raised">
                            Update
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
export default connect(null, { createPeriod })(withStyles(styles)(create));