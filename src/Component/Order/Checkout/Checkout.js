import React, { Component } from "react";
import { Button, Modal, ModalBody } from 'reactstrap'
import { connect } from "react-redux";
import Spinner from "../../../Spinner/Spinner";
import { reset_ingredient } from '../../../redux/actionCreators'

import axios from "axios";


const mapStateToProps = state => {
    return {
        ingredient: state.ingredient
        , totalPrice: state.totalPrice
        , purchasable: state.purchasable

        , userId: state.userId
        , token: state.token



    }

}
const mapDispatchToProps = dispatch => {
    return {
        reset_ingredient: () => dispatch(reset_ingredient())
    }
}


class Checkout extends Component {

    state = {
        values: {
            deliveryAddress: ''
            , phone: '',
            payment: 'Cash On Delivery'
        }
        , isLoading: false
        , isModalOpen: false
        , modalMsg: ''
    }
    goBack = () => {
        this.props.history.goBack('/');
    }
    inputChangeHandler = e => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }

    formSubmitHandler = () => {
        this.setState({
            isLoading: true
        })

        const order = {
            ingredient: this.props.ingredient
            , customer: this.state.values
            , totalPrice: this.props.totalPrice
            , userId: this.props.userId



        }
        axios.post('https://burger-builder-2af17-default-rtdb.firebaseio.com/orders.json?auth=' + this.props.token, order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false
                        , isModalOpen: true
                        , modalMsg: "Order Placed Successfully"
                    })
                    this.props.reset_ingredient()
                }
                else {
                    this.setState({
                        isLoading: false
                        , isModalOpen: true
                        , modalMsg: 'Something went to wrong! Order Again!'
                    })
                }
            })
            .catch(error => {
                this.setState({
                    isLoading: false
                    , isModalOpen: true
                    , modalMsg: "Something went to wrong"
                })
            })
    }

    render() {
        let form = (<div>
            <h4
                style={{
                    border: '1px solid black'
                    , padding: '20px'
                    , borderRadius: '10px'
                    , boxShadow: '1px 1px 5px grey'
                }}


            >Price: TK. {this.props.totalPrice} BDT</h4>
            <form
                style={{
                    border: '1px solid black'
                    , padding: '20px'
                    , borderRadius: '10px'
                    , boxShadow: '1px 1px 5px grey'
                }}

            >

                <textarea className="form-control" name="deliveryAddress" value={this.state.values.deliveryAddress} placeholder='Contact-Information '
                    onChange={(e) => this.inputChangeHandler(e)}

                />
                <br />

                <input className="form-control" name='phone' value={this.state.values.phone} placeholder="Phone no."
                    onChange={(e) => this.inputChangeHandler(e)}
                />

                <br />

                <select className="form-control" name="payment" value={this.state.values.payment} onChange={(e) => this.inputChangeHandler(e)} >
                    <option name='cash on delivery'>Cash On Delivery</option>
                    <option name='Bkash'>Bkash</option>



                </select>
                <br /><br />

                <Button className='mr-auto btn-success' onClick={this.formSubmitHandler} disabled={!this.props.purchasable}>Placed Order</Button>
                <Button className='ml-3 btn-danger' onClick={this.goBack}>Cancel</Button>
            </form>
        </div>)
        return (



            <div>
                {
                    this.state.isLoading ? <Spinner /> : form
                }

                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);