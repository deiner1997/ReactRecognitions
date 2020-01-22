import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import InlineError from '../Messages/InlineErrors'
import api from "../../api";
import moment from "moment"
const CustomTableCell = withStyles(theme => ({
    head: {
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const styles = theme => ({
    typography: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    form: {
        textAlign: 'center',
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },

});
class list extends React.Component {
    state = {
        listPeriod: [],
        errorRequest: ""
    }
    componentDidMount() {
        api.period.getPeriods()
            .then(data => {
                this.setState({ listPeriod: data.periods })
            })
            .catch(err => this.setState({ errorRequest: err.response.data.message }))
        api.period.getPeriodActived()
            .then(data => {
                this.setState({ errorRequest: "" })
            })
            .catch(err => this.setState({ errorRequest: err.response.data.message }));
    }
    render() {
        const { classes } = this.props;
        const { listPeriod, errorRequest } = this.state;
        return (

            <Fragment className={classes.root}>
                <Typography className={classes.typography} variant="h6" gutterBottom>
                    {errorRequest ? <InlineError text={errorRequest} /> : "Periods"}
                </Typography>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="center">Name</CustomTableCell>
                            <CustomTableCell align="center">Start Date</CustomTableCell>
                            <CustomTableCell align="center">End Date</CustomTableCell>
                            <CustomTableCell align="center">Status</CustomTableCell>
                            <CustomTableCell align="center">Action</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listPeriod.map(row => (
                            <TableRow className={classes.row} key={row._id}>
                                <CustomTableCell align="center">{row.name}</CustomTableCell>
                                <CustomTableCell align="center">{moment.utc(row.startdate).format("YYYY-MM-DD")}</CustomTableCell>
                                <CustomTableCell align="center">{moment.utc(row.enddate).format("YYYY-MM-DD")}</CustomTableCell>
                                <CustomTableCell align="center">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                value="check"
                                                color="primary"
                                                checked={row.status}
                                            />
                                        }
                                        label="Status"
                                    />
                                </CustomTableCell>
                                <CustomTableCell component={Link} to={`/edit/period/${row._id}`} align="center"><EditIcon /></CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fragment>
        );
    }
}
list.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(list);