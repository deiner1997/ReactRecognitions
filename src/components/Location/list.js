import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import api from "../../api"
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    typography: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    form: {
        textAlign: 'center',
    }
});
class list extends React.Component {
    state = {
        listLocations: [],
        errorRequest: ""
    }
    componentDidMount() {
        api.location.getlocations()
            .then(data => {
                this.setState({ listLocations: data.locations })
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    }
    render() {
        const { classes } = this.props;
        const { listLocations } = this.state;
        return (
            <Fragment>
                <Typography className={classes.typography} variant="h6" gutterBottom>
                    Location
                </Typography>
                <Grid className={classes.form} item xs={12}>
                    {listLocations.map(option => (
                        <Typography key={option._id} className={classes.typography} variant="h5" gutterBottom>
                            {option.name}
                        </Typography>
                    ))}
                </Grid>
            </Fragment>
        );
    }
}
list.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(list);