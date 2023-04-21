import React, { Component } from "react";
import { auth_logout } from "../redux/authActionCreator";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const mapDispatchToProps = dispatch => {
    return {
        auth_logout: () => dispatch(auth_logout())
    }
}

class Logout extends Component {

    componentDidMount() {
        this.props.auth_logout()
    }
    render() {
        return (
            <Redirect to='/login' />
        )
    }
}


export default connect(null, mapDispatchToProps)(Logout)