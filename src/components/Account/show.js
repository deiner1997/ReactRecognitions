import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import isEmpty from 'is-empty';


const styles = theme => ({

    formControl: {
        margin: theme.spacing.unit,
        width: 500
    },
    colorbutton: {
        color: "red"
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        textAlign: 'center',
    },
});
class show extends Component {
    render() {
        const { classes, user } = this.props;
        return (
            <Fragment className={classes.paper}>
                <Typography variant="h4" gutterBottom>
                    Personal information
                    </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    Username:
                        </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {user.username}
                </Typography>
                <br />
                <Typography variant="subtitle2" gutterBottom>
                    Email:
                        </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {user.email}
                </Typography>
                <br />
                <Typography variant="subtitle2" gutterBottom>
                    Name:
                        </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {user.name}
                </Typography>
                <br />
                <Typography variant="subtitle2" gutterBottom>
                    Role:
                        </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {!isEmpty(user.Role) ? user.Role.name : null}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    Area:
                        </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {!isEmpty(user.Area) ? user.Area.name : null}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    Location:
                        </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {!isEmpty(user.Location) ? user.Location.name : null}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    Position:
                        </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {!isEmpty(user.Position) ? user.Position.name : null}
                </Typography>
            </Fragment>
        );
    }
}
show.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(show);