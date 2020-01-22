import React, {Fragment} from 'react';
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
    typography: {
        textAlign: 'center',
    }
});

class listSendRecognition extends React.Component {
    constructor() {
        super();
        this.state = {
            listRecognition: [],
            errorRequest:""
        }
    }
    componentDidMount() {
        api.infoRecognition.getSendRecognitions()
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
            <Fragment>
                <Table className={classes.table} id="table-send-recognition">
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="center">Created by</CustomTableCell>
                            <CustomTableCell align="center">User assign</CustomTableCell>
                            <CustomTableCell align="center">Description</CustomTableCell>
                            <CustomTableCell align="center">Category or Subcategory</CustomTableCell>
                            <CustomTableCell align="center">Status</CustomTableCell>


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
                                       row.categoryId.title +", "+ row.valueId.title
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
                                            checked={row.status}
                                            color="primary"
                                            />
                                        }
                                        label="Approved"
                                    />
                                </CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {this.state.errorRequest ? <InlineError text={this.state.errorRequest} /> : null}
                {isEmpty(listRecognition) ?
                    <Typography className={classes.typography} variant="h5" color="primary" gutterBottom>
                        We do not find sended recognitions approved
                         </Typography>
                    : null}
            </Fragment>
        );
    }
}

listSendRecognition.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(listSendRecognition);