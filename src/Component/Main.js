import React from "react";
import Header from "./BurgerBuilder/Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";

import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";



import Order from "./Order/Order";
import Checkout from "./Order/Checkout/Checkout";
import Auth from "../Auth/Auth";
import Logout from "../Auth/Logout";

import { auth_Checking } from "../redux/authActionCreator";

import { Component } from "react";


const mapStateToProps = state => {
    return {
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        auth_Checking: () => dispatch(auth_Checking())
    }
}








class Main extends Component {

    componentDidMount() {
        this.props.auth_Checking()
    }

    render() {

        let routes = null;
        if (this.props.token === null) {
            routes = (
                <Switch>
                    <Route path="/login" exact component={Auth} />
                    <Redirect to="/login" />
                </Switch>
            )
        } else {
            routes = (
                <Switch>
                    <Route path="/order" exact component={Order} />
                    <Route path="/logout" exact component={Logout} />
                    <Route path="/checkout" exact component={Checkout} />


                    <Route path="/" exact component={BurgerBuilder} />

                    <Redirect to='/' />
                </Switch>
            )
        }



        return (
            <div>
                <Header />
                <div className="container">


                    {routes}


                </div>
            </div>
        )
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(Main);