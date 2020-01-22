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
import api from '../../api';
import isEmpty from "is-empty";
import Typography from '@material-ui/core/Typography';
import moment from "moment";
import InlineError from '../Messages/InlineErrors';
const CustomTableCell = withStyles(theme => ({
    head: {
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
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
        typography: {
            textAlign: 'center',
        }
    },
});

class shoppings extends React.Component {


    constructor() {
        super();
        this.state = {
            listShoppings: [],
            errorRequest:""
        }
    }
    componentDidMount() {
        api.shopping.getShoppings()
            .then(data => {
                this.setState({ listShoppings: data.shoppings })
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    }
    handleChangeStatus = event => {
        const shoppingId = event.target.name;
        const status = event.target.checked;
        api.shopping.update(shoppingId, status)
            .then(() => window.location.href = "/shopping")
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    };
    render() {
        const { classes } = this.props;
        const { listShoppings } = this.state;
        return (
            <Fragment className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="center">User</CustomTableCell>
                            <CustomTableCell align="center">Catalogue</CustomTableCell>
                            <CustomTableCell align="center">Category</CustomTableCell>
                            <CustomTableCell align="center">Date</CustomTableCell>
                            <CustomTableCell align="center">Status</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listShoppings.map(row => (
                            <TableRow className={classes.row} key={row._id}>
                                <CustomTableCell align="center">{row.userId.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.catalogueId.title}</CustomTableCell>
                                <CustomTableCell align="center">{row.catalogueId.category}</CustomTableCell>
                                <CustomTableCell align="center">{moment.utc(row.date).format("YYYY-MM-DD")}</CustomTableCell>
                                <CustomTableCell align="center">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name={row._id}
                                                onChange={this.handleChangeStatus}
                                                value={row.state}
                                                color="primary"
                                            />
                                        }
                                        label={row.status ? "Delivered" : "Pending delivery"}
                                    />
                                </CustomTableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
                {this.state.errorRequest ? <InlineError text={this.state.errorRequest} /> : null}
                {isEmpty(listShoppings) ?
                    <Typography className={classes.typography} variant="h5" color="primary" gutterBottom>
                        In database not exist shoppings pending delivery.
                         </Typography>
                    : null}
            </Fragment>
        );
    }
}

shoppings.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(shoppings)