import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import TableRow from '@material-ui/core/TableRow';
import api from '../../api';
import isEmpty from "is-empty";
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import InlineError from '../Messages/InlineErrors';

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
        width: 300,
    },
    menu: {
        width: 300,
    },
});

class actualPeriod extends React.Component {


    constructor() {
        super();
        this.state = {
            listRecognition: [],
            listPeriod: [],
            periodId: "",
            message: "Please select the period",
            errorRequest: ""
        }
    }
    componentDidMount() {
        api.period.getPeriods()
            .then(data => {
                this.setState({ listPeriod: data.periods })
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        api.infoRecognition.getPointsTotalUserPeriodSelected(this.props.user[0]._id, event.target.value)
            .then(data => {
                
                this.setState({
                    listRecognition: data.recognitions,
                    message: !isEmpty(data.recognitions) ? "" : " We don't find recognitions approved in this period."
                });
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    };
    render() {
        const { classes } = this.props;
        const { listRecognition, listPeriod, periodId,errorRequest } = this.state;
        return (
            <Fragment >
                <TextField
                    id="select-period"
                    select
                    label="Select the period"
                    className={classes.textField}
                    value={periodId}
                    name="periodId"
                    onChange={this.handleChange}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Please select the period"
                    margin="normal"
                >
                    {listPeriod.map(option => (
                        <MenuItem key={option._id} value={option._id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="center">User</CustomTableCell>
                            <CustomTableCell align="center">Area</CustomTableCell>
                            <CustomTableCell align="center">Period</CustomTableCell>
                            <CustomTableCell align="center">Points</CustomTableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listRecognition.map(row => (
                            <TableRow className={classes.row} key={row._id} component={Link} to={`/show/breakdownOld/${row.userId._id}&${this.state.periodId}`}>
                                <CustomTableCell align="center">{row.userId.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.areaId.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.periodId.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.pointsTotal}</CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <br />
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

actualPeriod.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return { user: state.auth };
}
export default connect(mapStateToProps, null)(withStyles(styles)(actualPeriod));