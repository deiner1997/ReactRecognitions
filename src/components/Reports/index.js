import React, { Fragment } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OldPeriod from './oldperiod'
import ActualPeriod from './actualperiod'
import OldAdministration from './oldAdministration';
import OldProduction from './oldProduction';
import Administration from './administration';
import Production from './production';
import { connect } from "react-redux";
import isEmpty from "is-empty";


class index extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };



    render() {
        const { user } = this.props;
        const { value } = this.state;
        if (!isEmpty(user)) {
            return (
                <Fragment >
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Actual Period" />
                        <Tab label="Old periods" />
                        {user[0].Role.name === "Admin" ? <Tab label="Administration actual" /> : null}
                        {user[0].Role.name === "Admin" ? <Tab label="Production actual" /> : null}
                        {user[0].Role.name === "Admin" ? <Tab label="Old administration periods" /> : null}
                        {user[0].Role.name === "Admin" ? <Tab label="Old production periods" /> : null}
                    </Tabs>
                    {value === 0 && <ActualPeriod />}
                    {value === 1 && <OldPeriod />}
                    {value === 2 && <Administration />}
                    {value === 3 && <Production />}
                    {value === 4 && <OldAdministration />}
                    {value === 5 && <OldProduction />}
                </Fragment>
            );
        } else {
            window.location.href = "/login";
        }
    }
}
function mapStateToProps(state) {
    return { user: state.auth };
}
export default connect(mapStateToProps, null)(index);