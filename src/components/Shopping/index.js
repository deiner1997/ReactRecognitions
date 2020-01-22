import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from './list'
import Shop from './shop'
import Shoppings from './shoppings'
import { connect } from "react-redux";
import isEmpty from "is-empty";

const styles = theme => ({
    root: {
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
            return (
                <Fragment className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Shop" />
                        <Tab label="My shoppings" />
                        {user[0].Role.name === "Admin" ? <Tab label="Shoppings" /> : null}

                    </Tabs>
                    {value === 0 && <Shop />}
                    {value === 1 && <List />}
                    {value === 2 && <Shoppings />}
                </Fragment>
            );
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