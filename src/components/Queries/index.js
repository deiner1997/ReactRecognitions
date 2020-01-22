import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Month from './byMonth'
import Subcategory from './bySubcategory'
import Category from './byCategory'
import { connect } from "react-redux";

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
        if(user[0].Role.name==="Admin"){
        return (
                <Fragment className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Month"/>
                        <Tab label="Category"/>
                        <Tab label="Subcategory"/>
                    </Tabs>
                    {value=== 0 && <Month/>}
                    {value=== 1 && <Category/>}
                    {value=== 2 && <Subcategory/>}

                </Fragment>
        );
        } else {
            window.location.href = "/dashboard";
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