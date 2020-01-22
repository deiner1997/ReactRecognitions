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
import moment from "moment";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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

class list extends React.Component {


    constructor() {
        super();
        this.state = {
            listShopping: [],
            errorRequest:""
        }
    }
    componentDidMount() {
        api.shopping.getShoppingUser()
            .then(data => {
                this.setState({ listShopping: data.shopping })
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    }
    render() {
        const { classes } = this.props;
        const { listShopping } = this.state;
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
                    {listShopping.map(row => (
                                    <TableRow className={classes.row} key={row._id}>
                                        <CustomTableCell align="center">{row.userId.name}</CustomTableCell>
                                        <CustomTableCell align="center">{row.catalogueId.title}</CustomTableCell>
                                        <CustomTableCell align="center">{row.catalogueId.category}</CustomTableCell>
                                        <CustomTableCell align="center">{moment.utc(row.date).format("YYYY-MM-DD")}</CustomTableCell>
                                        <CustomTableCell align="center">
                                        <FormControlLabel
                                        control={
                                            <Switch
                                            checked={row.status}
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
                {isEmpty(listShopping) ?
                    <Typography className={classes.typography} variant="h5" color="primary" gutterBottom>
                        You can't have shoppings in this period.
                         </Typography>
                    : null}
            </Fragment>
        );
    }
}

list.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return { user: state.auth };
  }
  export default connect(mapStateToProps, null)(withStyles(styles)(list));