import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import isEmpty  from "is-empty";
import { connect } from "react-redux";
import InlineError from "../Messages/InlineErrors";
import { createPeriod } from "../../actions/period";
import moment from "moment"
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing.unit,
        width: 500
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
      },
});
class create extends React.Component {
    constructor() {
        super();
        this.state = {
            period: {status: false,
            startdate:"",
            enddate:""},
            error:{},
            errorRequest:""
        }
    }
    handleChangeStatus = event => {
        this.setState({ period: { ...this.state.period, [event.target.name]: event.target.checked }});
    };

    handleChange = event => this.setState({  period: { ...this.state.period, [event.target.name]: event.target.value }    });
    handleSubmit = event => {
        event.preventDefault();
        const error = this.validate(this.state.period);
        this.setState({ error })
        if (Object.keys(error).length === 0) {
            var startdate = new Date(this.state.period.startdate);
            startdate = moment.utc(startdate).format("YYYY-MMMM-DD");
            var enddate = new Date(this.state.period.enddate);
            enddate = moment.utc(enddate).format("YYYY-MMMM-DD");
            var name = startdate + " - " + enddate;
            
            this.props.createPeriod(name,this.state.period.startdate, this.state.period.enddate,this.state.period.status)
                .then(() => window.location.href = "/period")
                .catch(err => this.setState({ errorRequest: err.response.data.message }));
        }

    }
    validate = period => {
        const error = {};
        if (isEmpty(period.startdate)) { error.startdate = "Start date is required"; }
        if (isEmpty(period.enddate)) { error.enddate = "End date is required"; }
        if (isEmpty(period.status)) { error.status = "Status is required"; }
        return error;
    }
    render() {
        const { classes } = this.props;
        const {period, error, errorRequest} = this.state
        return (
            <Fragment>
                <Typography variant="h4" gutterBottom>
                    Create Period
                    </Typography>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField
                        id="startdate"
                        label="Start period"
                        type="date"
                        name="startdate"
                        value={period.startdate}
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
                        value={period.enddate}
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
                                checked={period.status}
                                onChange={this.handleChangeStatus}
                                value={period.status}
                                name="status"
                            />
                        }
                        label="Status"
                    />
                    <br />
                    {error.status ? <InlineError text={error.status} /> : null}
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
export default connect(null, { createPeriod})(withStyles(styles)(create));