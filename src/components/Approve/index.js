import React from 'react';
import { connect } from "react-redux";
import ListPendingRecognition from './listPendingRecognition';
import isEmpty from "is-empty";

class index extends React.Component {
    render() {
        const { user } = this.props;
        if (!isEmpty(user)) {
            if (user[0].Role.name === "Admin") {
                return (
                    <ListPendingRecognition />
                );
            } else {
                window.location.href = "/dashboard";
            }
        } else {
            window.location.href = "/login";
        }
    }
}
function mapStateToProps(state) {
    return { user: state.auth };
}
export default connect(mapStateToProps, null)(index);