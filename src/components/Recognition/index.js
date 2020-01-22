import React, {Fragment } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SendRecognition from './sendRecognition'
import ReceiveRecognition from './receiveRecognition'
import PendingRecognition from './pendingRecognition'
import isEmpty from "is-empty";
import { connect } from "react-redux";
class index extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };



    render() {
        const { value } = this.state;
        const {user} =this.props
        if(!isEmpty(user)){
        return (
                <Fragment>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Sent"/>
                        <Tab label="Received"/>
                        <Tab label="Pending"/>
                    </Tabs>
                    {value=== 0 && <SendRecognition/>}
                    {value=== 1 && <ReceiveRecognition/>}
                    {value=== 2 && <PendingRecognition/>}
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