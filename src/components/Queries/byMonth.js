import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import api from '../../api';
import isEmpty from "is-empty";
import Typography from '@material-ui/core/Typography';
import InlineError from "../Messages/InlineErrors";
import moment from "moment";
const CustomTableCell = withStyles(theme => ({
    head: {
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    table: {
        minWidth: 700,
    },
    row: {
        textDecoration: 'none',
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },

    },
    typography: {
        textAlign: 'center',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
    },
    menu: {
        width: 150,
    },
});

class byMonth extends React.Component {


    constructor() {
        super();
        this.state = {
            listRecognition: [],
            startdate: "",
            enddate: "",
            error: {},
            errorRequest: "",
            total: "",
            message: "Please select the dates"
        }
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    validate = () => {
        const error = {};
        if (isEmpty(this.state.startdate)) { error.startdate = "Start date is required"; }
        if (isEmpty(this.state.enddate)) { error.enddate = "End date is required"; }
        return error;
    }
    handleClick = event => {
        event.preventDefault();
        const error = this.validate();
        this.setState({ error })
        if (Object.keys(error).length === 0) {
            api.infoRecognition.searchByMonth(moment.utc(this.state.startdate).format(), moment.utc(this.state.enddate).format())
                .then((data => this.setState({
                    listRecognition: data.recognitions, total: data.recognitions.length,
                    message: !isEmpty(data.recognitions) ? "" : "On these dates no recognitions have been created"
                })))
                .catch(err => 
                    this.setState({ errorRequest: err.response.data.message })
                    );
        }

    }
    render() {
        const { classes } = this.props;
        const { errorRequest, enddate, startdate, listRecognition, error, total } = this.state;
        return (
            <Fragment >
                <Typography variant="h4" gutterBottom>
                    Search by dates
                    </Typography>
                <TextField
                    id="startdate"
                    label="Start period"
                    type="date"
                    name="startdate"
                    value={startdate}
                    onChange={this.handleChange}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="enddate"
                    label="End period"
                    type="date"
                    name="enddate"
                    value={enddate}
                    onChange={this.handleChange}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />
                <br />
                {error.startdate ? <InlineError text={error.startdate} /> : null}
                {error.enddate ? <InlineError text={error.enddate} /> : null}
                <Button type="submit" color="primary" variant="raised" onClick={(e) => {
                    this.handleClick(e)
                }}>
                    Search
                        </Button>
                <br />
                {!isEmpty(total) ? <h4>Total recognitions: {total}</h4> : null}
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="center">Created by</CustomTableCell>
                            <CustomTableCell align="center">User assign</CustomTableCell>
                            <CustomTableCell align="center">Description</CustomTableCell>
                            <CustomTableCell align="center">Category or Subcategory</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listRecognition.map(row => (
                            <TableRow className={classes.row} key={row._id}>
                                <CustomTableCell align="center">{row.usercreateId.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.userAssignId.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.description}</CustomTableCell>
                                {!isEmpty(row.categoryId) ?
                                    <CustomTableCell align="center">
                                        {
                                            row.categoryId.title === "Outstanding Values" ?
                                                row.categoryId.title + ", " + row.valueId.title
                                                : row.categoryId.title
                                        }
                                    </CustomTableCell>
                                    : !isEmpty(row.subcategoryId) ?
                                        <CustomTableCell align="center">
                                            {row.subcategoryId.title}
                                        </CustomTableCell>
                                        : null}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {errorRequest ? <InlineError text={errorRequest} /> : null}
                {isEmpty(listRecognition) ?
                    <Typography className={classes.typography} variant="h5" color="primary" gutterBottom>
                        {this.state.message}
                    </Typography>
                    : null}
            </Fragment>
        );
    }
}

byMonth.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(byMonth);