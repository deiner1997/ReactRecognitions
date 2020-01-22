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

class byCategory extends React.Component {


    constructor() {
        super();
        this.state = {
            listRecognition: [],
            listCategory: [],
            categoryId: "",
            total:"",
            message:"Please select the category",
            errorRequest: ""
        }
    }
    componentDidMount() {
        api.category.getCategories()
            .then(data => {
                this.setState({ listCategory: data.categories })
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message });
            });
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        api.infoRecognition.searchByCategory(event.target.value)
            .then(data => {
                this.setState({ listRecognition: data.recognitions , total: data.recognitions.length,
                    message:  !isEmpty(data.recognitions) ? "" : "In this category no recognitions have been created"
                });
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    };
    render() {
        const { classes } = this.props;
        const { listRecognition, listCategory, categoryId,total } = this.state;
        return (
            <Fragment >
                <TextField
                    id="select-category"
                    select
                    label="Select the category"
                    className={classes.textField}
                    value={categoryId}
                    name="categoryId"
                    onChange={this.handleChange}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Please select the category"
                    margin="normal"
                >
                    {listCategory.map(option => (
                        <MenuItem key={option._id} value={option._id}>
                            {option.title}
                        </MenuItem>
                    ))}
                </TextField>
                <br />
                <br />
                {!isEmpty(total) ? <h4>Total recognitions: {total}</h4> : null}
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="center">Created by</CustomTableCell>
                            <CustomTableCell align="center">User assign</CustomTableCell>
                            <CustomTableCell align="center">Description</CustomTableCell>
                            <CustomTableCell align="center">Category</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listRecognition.map(row => (
                            <TableRow className={classes.row} key={row._id}>
                                <CustomTableCell align="center">{row.usercreateId.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.userAssignId.name}</CustomTableCell>
                                <CustomTableCell align="center">{row.description}</CustomTableCell>
                                <CustomTableCell align="center">{!isEmpty(row.categoryId) ?
                                    row.categoryId.title === "Outstanding Values" ?
                                        row.categoryId.title + ", " + row.valueId.title
                                        : row.categoryId.title
                                    : null}</CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {isEmpty(listRecognition) ?
                    <Typography className={classes.typography} variant="h5" color="primary" gutterBottom>
                       {this.state.message}
                         </Typography>
                    : null}
            </Fragment>
        );
    }
}

byCategory.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(byCategory);