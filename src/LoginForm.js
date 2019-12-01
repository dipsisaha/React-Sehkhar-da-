import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import SignUpForm from './SignUpForm';
import Dashboard from './Dashboard';


import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            user: '',
            password:''
        }
    }

    toggleForm(user, isOpen) {
        this.setState({
            isOpen: isOpen,
            user: user
        });
    }
    
    submitFormHandle(e) {
        e.preventDefault();
       /* let apiUrl = `http://localhost:8080/api/products/${product.id}/reviews`;
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        })
            .then(response => response.json())
            .then(review => {
                let { reviews } = this.state;
                reviews = reviews.concat(review);
                this.setState({ reviews });
            });

*/

        let loginInfo = {
            user: this.refs.user.value,
            password: this.refs.password.value,
        }
        let { isOpen } = false;
        this.toggleForm(loginInfo.user, isOpen);
    }

    resetFields(){
        this.refs.password.value="";
        this.refs.user.value="";
    }

    renderForm() {
        
        let { isOpen, user,password } = this.state;
        if (!isOpen) {
            return (
                <Dashboard user={user} />
            )
        } else {
            return (
                <div>
                    <div className="card">
                        <form onSubmit={(e) => { this.submitFormHandle(e) }}>
                            <div className="card-header">Login Form</div>
                            <br />
                            <div className="card-body">
                                <label>User</label>
                                <input defaultValue={this.user} className="form-control" id="user" type="text" ref="user" />
                                {user === null ? 'UId Cant be Null' : null}
                                <label>Password</label>
                                <input className="form-control" id="password" type="password" ref="password" />
                                <br />
                                <button className="btn btn-primary" >Login</button> &nbsp;
                                <button className="btn btn-warning" type="button" onClick={()=>this.resetFields()}>Cancel</button>
                                &nbsp;<Link to="/SingUp" params={{ isOpen: true }}>Sign Up</Link>
                            </div>
                        </form>
                    </div>
                </div>

            );
        }
    }

    render() {
        console.log("LoginForm::Calling the render ")
        return (
            <div>
                <div className="row">
                    {this.renderForm()}
                </div>
            </div>
        );
    }
}

export default LoginForm;