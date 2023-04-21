import React from "react";
import './Header.css'
import { NavLink } from "react-router-dom";


import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap'
import Logo from '../../../assets/logo.png'

import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        token: state.token
    }
}








const Header = props => {

    let links = null;
    if (props.token === null) {
        links = (<div>
            <Nav className="ml-md-5">


                <NavItem>
                    <NavLink exact to='/login' className='NavLink'>Login</NavLink>
                </NavItem>


            </Nav>
        </div>)


    } else {
        links = (
            <div>
                <Nav className="ml-md-5">

                    <NavItem>
                        <NavLink to='/' exact className='NavLink'>BurgerBuilder</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to='/order' className='NavLink'>Order</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to='/logout' className='NavLink'>Logout</NavLink>
                    </NavItem>



                </Nav>
            </div>
        )
    }




    return (
        <div className="Navigation">
            <Navbar
                style={{
                    backgroundColor: '#d70f64'
                    , height: '70px'

                }}

            >
                <NavbarBrand href='/' className='mr-auto mr-md-5 Brand'>
                    <img src={Logo} alt='Logo'
                        width='80px'

                    />
                </NavbarBrand>
                {links}

            </Navbar>
        </div>
    )
}








export default connect(mapStateToProps)(Header);