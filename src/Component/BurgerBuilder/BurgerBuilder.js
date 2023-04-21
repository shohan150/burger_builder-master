import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Control from "./Control/Control";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import Summery from "./Summery/Summery";

import { ingredient_added, ingredient_remove, update_purchasable } from '../../redux/actionCreators'

import { connect } from "react-redux";


const mapStateToProps = state => {

    return {
        ingredient: state.ingredient,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ingredient_added: (igtype) => dispatch(ingredient_added(igtype))
        , ingredient_remove: (igtype) => dispatch(ingredient_remove(igtype))
        , update_purchasable: () => dispatch(update_purchasable())

    }
}



class BurgerBuilder extends Component {
    state = {

        modalOpen: false

    }


    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    ingredientAdded = type => {
        this.props.ingredient_added(type)
        this.props.update_purchasable()

    }
    ingredientRemove = type => {
        this.props.ingredient_remove(type)
        this.props.update_purchasable()
    }

    handleCheckout = () => {
        this.props.history.push('/checkout')
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredient={this.props.ingredient} />
                    <Control
                        ingredientAdded={this.ingredientAdded}
                        ingredientRemove={this.ingredientRemove}
                        Price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        purchasable={this.props.purchasable}

                    />
                </div>
                <Modal isOpen={this.state.modalOpen} >
                    <ModalHeader>
                        <h5>Ingredient Summery</h5>
                    </ModalHeader>
                    <ModalBody>
                        <h5>Price : TK. {this.props.totalPrice} BDT</h5>
                        <Summery ingredient={this.props.ingredient} />

                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-success" onClick={this.handleCheckout}>Continue To Checkout</Button>
                        <Button className="btn btn-danger" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>

                </Modal>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);