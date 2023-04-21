import React, { Component } from 'react'

import { Formik } from 'formik'
import { connect } from 'react-redux'
import { auth } from '../redux/authActionCreator'
import Spinner from '../Spinner/Spinner'
import { Alert } from 'reactstrap'

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFaildMsg: state.authFailedMsg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}




class Auth extends Component {
    state = {
        mode: 'Sign Up'
    }

    modeHandler = () => {
        this.setState({
            mode: this.state.mode === 'Sign Up' ? 'Login' : 'Sign Up'
        })
    }
    render() {
        let err = null;
        if (this.props.authFaildMsg !== null) {
            err = <Alert color='danger'
                style={{
                    borderLeft: '5px solid red'
                }}

            >{this.props.authFaildMsg}</Alert>
        }


        let form = null;
        if (this.props.authLoading) {
            form = (
                <Spinner />
            )
        }
        else {
            form = (
                <Formik
                    initialValues={
                        {
                            email: '',
                            password: '',
                            passwordConfirm: ''
                        }
                    }
                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode)
                        }
                    }
                    validate={
                        (values => {
                            const errors = {}

                            if (!values.email) {
                                errors.email = 'Required'
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email addresss';
                            }

                            if (!values.password) {
                                errors.password = 'Required';
                            } else if (values.password.length < 4) {
                                errors.password = 'password atleast 4 charecter'
                            }

                            if (this.state.mode === 'Sign Up') {
                                if (!values.passwordConfirm) {
                                    errors.passwordConfirm = 'Required'
                                } else if (values.password !== values.passwordConfirm) {
                                    errors.passwordConfirm = 'password does not match'
                                }
                            }

                            console.log(errors)
                            return errors

                        }

                        )
                    }

                >
                    {
                        ({ handleSubmit, handleChange, values, errors }) => (
                            <div
                                style={{

                                    padding: '20px',

                                    border: '1px solid grey',
                                    borderTop: '5px solid #d70f64',
                                    borderRadius: '5px',
                                    boxShadow: '1px 1px 5px grey'



                                }}
                            >
                                <button
                                    className='btn btn-lg'
                                    style={{
                                        width: '100%'
                                        , backgroundColor: '#d70f64'
                                        , color: 'white'
                                    }}
                                    onClick={this.modeHandler}

                                >





                                    Switch to {this.state.mode === 'Sign Up' ? 'Login' : 'Sign Up'}

                                </button>
                                <br />
                                <br />

                                <form onSubmit={handleSubmit}>
                                    <input
                                        name='email'
                                        className='form-control'
                                        placeholder='E-mail'
                                        value={values.email}
                                        onChange={handleChange}

                                    />
                                    <span>{errors.email}</span>
                                    <br />
                                    <input
                                        name='password'
                                        className='form-control'
                                        placeholder='Password'
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                    <span>{errors.password}</span>
                                    <br />

                                    {this.state.mode === "Sign Up" ? <div>
                                        <input
                                            name='passwordConfirm'
                                            className='form-control'
                                            placeholder='Password Confirm'
                                            value={values.passwordConfirm}
                                            onChange={handleChange}

                                        />
                                        <span >{errors.passwordConfirm}</span>

                                        <br />
                                    </div> : null}
                                    <button className='btn btn-success' type='submit'> {this.state.mode === 'Sign Up' ? 'Sign Up' : 'Login'}</button>

                                </form>
                            </div>
                        )
                    }

                </Formik>
            )
        }
        return (
            <div>
                {err}
                {form}
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth)


