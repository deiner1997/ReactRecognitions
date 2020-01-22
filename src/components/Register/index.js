import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from './list'
import Create from './Create'
import Update from './update'
import { connect } from "react-redux";
import isEmpty from "is-empty";

const styles = theme => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',

    },
});

class index extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };



    render() {
        const { classes, user } = this.props;
        const { value } = this.state;
        if (!isEmpty(user)) {
            if (user[0].Role.name === "Admin") {
                return (
                    <Fragment className={classes.root}>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="List Users" />
                            <Tab label="Create Users" />
                            <Tab label="Inactive users" />
                        </Tabs>
                        {value === 0 && <List />}
                        {value === 1 && <Create />}
                        {value === 2 && <Update />}

                    </Fragment>
                );
            } else {
                window.location.href = "/dashboard";
            }
        } else {
            window.location.href = "/login";
        }
    }
}
index.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return { user: state.auth };
}
export default connect(mapStateToProps, null)(withStyles(styles)(index));