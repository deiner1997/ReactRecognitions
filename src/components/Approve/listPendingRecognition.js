import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Delete from '@material-ui/icons/Delete'
import api from '../../api'
import moment from 'moment'
import isEmpty from 'is-empty'
import InlineError from '../Messages/InlineErrors';
import EditIcon from '@material-ui/icons/Edit';
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
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
        typography: {
            textAlign: 'center',
        }
    },
});

class listPendingRecognition extends React.Component {

    constructor() {
        super();
        this.state = {
            listRecognition: [],
            open: false,
            setOpen: false,
            errorRequest: "",
            idDelete: ""
        }
    }
    componentDidMount() {
        api.recognition.aprove()
            .then(data => {
                this.setState({ listRecognition: data.recognitions })
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    }
    handleClickOpen = (event, id) => {
        event.preventDefault();
        this.setState({
            setOpen: true,
            idDelete: id
        });

    };

    handleClose = () => {
        this.setState({ setOpen: false });
    };
    handleChangeStatus = event => {
        const recognizeId = event.target.name;
        const status = event.target.checked;
        api.recognition.update(recognizeId, status)
            .then(() => window.location.href = "/approve")
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    };
    handleDelete = (event, recognizeId) => {
        event.preventDefault();
        api.recognition.delete(recognizeId)
            .then(() => window.location.href = "/approve")
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    };
    showDialog = (recognizeId) => {
        return (
            <div>
                <Dialog
                    open={this.state.setOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this recognition?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            If you delete this recognition the user will not receive points.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                      </Button>
                        <Button onClick={(e) => {
                            this.handleDelete(e, recognizeId)
                        }} color="primary" autoFocus>
                            Delete
                      </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );

    }
    render() {
        const { classes } = this.props;
        const { listRecognition, idDelete } = this.state;
        return (
            <Fragment>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="center">Date</CustomTableCell>
                            <CustomTableCell align="center">Created by</CustomTableCell>
                            <CustomTableCell align="center">User assign</CustomTableCell>
                            <CustomTableCell align="center">Description</CustomTableCell>
                            <CustomTableCell align="center">Category or Subcategory</CustomTableCell>
                            <CustomTableCell align="center">Status</CustomTableCell>
                            <CustomTableCell align="center">Delete</CustomTableCell>
                            <CustomTableCell align="center">Update</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listRecognition.map(row => (
                            <TableRow className={classes.row} key={row._id}>
                                <CustomTableCell align="center">{moment.utc(row.created).format("YYYY-MM-DD")}</CustomTableCell>
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
                                        label="Status"
                                    />
                                </CustomTableCell>
                                <CustomTableCell align="center">
                                    <Delete onClick={(e) => {
                                        this.handleClickOpen(e, row._id)
                                    }} />
                                </CustomTableCell>
                                {this.state.setOpen ? this.showDialog(idDelete) : null}
                                <CustomTableCell component={Link} to={`/edit/recognize/${row._id}`} align="center"><EditIcon /></CustomTableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <br />
                {this.state.errorRequest ? <InlineError text={this.state.errorRequest} /> : null}
                {isEmpty(listRecognition) ?
                    <Typography className={classes.typography} variant="h5" color="primary" gutterBottom>
                        We do not find pending recognitions
                         </Typography>
                    : null}

            </Fragment>
        );
    }
}

listPendingRecognition.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(listPendingRecognition);