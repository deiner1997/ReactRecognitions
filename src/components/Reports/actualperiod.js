import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import api from '../../api';
import isEmpty from "is-empty";
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import InlineError from '../Messages/InlineErrors';
import { Link } from 'react-router-dom';
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
        typography: {
            textAlign: 'center',
        }
    },
});

class actualPeriod extends React.Component {


    constructor() {
        super();
        this.state = {
            listRecognition: [],
            errorRequest: ""
        }
    }
    componentDidMount() {
        api.infoRecognition.getPointsTotalUserPeriod(this.props.user[0]._id)
            .then(data => {
                this.setState({ listRecognition: data.recognitions })
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    }
    render() {
        const { classes } = this.props;
        const { listRecognition } = this.state;
        return (
            <Fragment >
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
                            <TableRow className={classes.row} key={row._id}  component={Link} to={`/show/breakdown/${row.userId._id}`}>
                                <CustomTableCell align="center">{row.userId.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.areaId.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.periodId.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.pointsTotal}</CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {this.state.errorRequest ? <InlineError text={this.state.errorRequest} /> : null}
                {isEmpty(listRecognition) ?
                    <Typography className={classes.typography} variant="h5" color="primary" gutterBottom>
                        You don't have recognitions approved.
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