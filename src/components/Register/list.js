import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import api from "../../api"
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
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class show extends React.Component {

    constructor() {
        super();
        this.state = {
            listUser: [],
            errorRequest: ""
        }
    }
    componentDidMount() {
        api.user.getUsers()
            .then(data => {
                this.setState({ listUser: data.user })
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    }
    handleChangeStatus = event => {
        const userId = event.target.name;
        const status = event.target.checked;
        api.user.updateUserStatus(userId,status)
            .then(() => window.location.href = "/register")
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    };
    render() {
        const { classes } = this.props;
        const { listUser, errorRequest } = this.state
        return (
            <Fragment>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="center">Name</CustomTableCell>
                            <CustomTableCell align="center">Location</CustomTableCell>
                            <CustomTableCell align="center">Area</CustomTableCell>
                            <CustomTableCell align="center">Position</CustomTableCell>
                            <CustomTableCell align="center">Role</CustomTableCell>
                            <CustomTableCell align="center">Status</CustomTableCell>
                            <CustomTableCell align="center">Update</CustomTableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listUser.map(row => (
                            <TableRow className={classes.row} key={row._id}>
                                <CustomTableCell align="center">{row.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.Location.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.Area.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.Position.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.Role.name}</CustomTableCell>
                                <CustomTableCell align="center">
                                <FormControlLabel
                                        control={
                                            <Switch
                                            checked={row.status}
                                                name={row._id}
                                                onChange={this.handleChangeStatus}
                                                value={row.status}
                                                color="primary"
                                            />
                                        }
                                        label="Status"
                                    />                                
                                </CustomTableCell>
                                <CustomTableCell component={Link} to={`/edit/user/${row._id}`} align="center"><EditIcon /></CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <br />
            {errorRequest ? <InlineError text={errorRequest} /> : null}
            </Fragment>
        );
    }
}

show.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(show);