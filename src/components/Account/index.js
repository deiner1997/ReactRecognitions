import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ShowUser from './show';
import { connect } from "react-redux";
import isEmpty from "is-empty";

class index extends React.Component {
    render() {
        const { user } = this.props;
        if(!isEmpty(user)){
            return (
                <Fragment>
                   <ShowUser user ={user[0]}/>
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
export default connect(mapStateToProps, null)(index);