import React, { Component } from "react";
import { fetchloadingOrder } from "../../redux/actionCreators";
import { connect } from "react-redux";

import OrderStyle from "./OrderStyle";
import Spinner from '../../Spinner/Spinner'


const mapstateToProps = state => {
    return {
        orders: state.orders
        , ordersLoading: state.ordersLoading
        , ordersErr: state.ordersErr
        , token: state.token
        , userId: state.userId


    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchloadingOrder: (token, userId) => dispatch(fetchloadingOrder(token, userId))
    }
}


class Order extends Component {

    componentDidMount() {
        this.props.fetchloadingOrder(this.props.token, this.props.userId)
    }
    componentDidUpdate() {
        console.log("u", this.props)
    }

    render() {
        let orders = null;
        if (this.props.ordersErr) {
            orders = <p style={{
                border: '1px solid grey'
                , padding: '20px'
                , boxShadow: '1px 1px 5px grey'


            }}>
                sorry failed to load orders

            </p>
        }
        else {
            if (this.props.orders.length === 0) {
                orders = <p
                    style={{
                        border: '1px solid grey'
                        , padding: '20px'
                        , boxShadow: '1px 1px 5px grey'
                        , backgroundColor: 'lightsalmon'
                    }}

                >
                    !You have no order

                </p>
            }
            else {
                orders = this.props.orders.map(item => {
                    return <OrderStyle order={item} key={item.key} />

                })
            }
        }
        return (
            <div>
                {this.props.ordersLoading ? <Spinner /> : orders}
            </div >

        )
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Order)