import React, { Component } from 'react';
import Popup from 'react-popup';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import LoginForm from './LoginForm';


class SignUpForm extends Component {
    constructor(props) {
        super(props);
        console.log('Calling SignUpForm ');
        this.state = {
            isOpen: this.props.isOpen,
            userName: '',
            address: '',
            email: '',
            password: 'abcd123',
            image:'/images/tamajit.png',
            like: '',
            comments: ["Test Comments"]
        };

        console.log("constructor this.props.isOpen>>>>> " + this.props.isOpen);
    }

    
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.handleNewReview();
    }
    handleNewReview() {
        let { isOpen } = false;
        console.log('Calling handleNewReview>>>>>>>>>' );
        const post={
            comments:this.state.comments,
            userName:this.state.userName,
            address:this.state.address,
            image:'/images/tamajit.png',
            email:this.state.email,
            like:10
        } 
    
    fetch('http://localhost:3020/saveStudent',{ 
            method: 'POST',
            headers:{
                'content-type':'application/JSON'
            },
            body:JSON.stringify(post)
        }).then(res=>res.text())
        .then(data=>{Popup.alert('Hello');this.toggleForm()})
    }
    

    toggleForm() {
        let { isOpen } = this.props;
        this.setState({ isOpen: !isOpen });
    }

    renderForm() {
        let { isOpen } = this.state;
        console.log("SignupFrm::!isOpen>>>>>>>>>>"+isOpen);
        if (isOpen===false) {
            console.log("Inside of if loop...");
            return (
                <LoginForm />
            )
        }
        else {
            return (

                <div>
                    <Popup />
                    <div className="card">
                        <form onSubmit={(e) => this.handleFormSubmit(e)}>
                            <div className="card-header">Create New User</div>
                            <br />
                            <div className="card-body">

                                <label>User ID</label>
                                <input type="text" className="form-control" id="userId" ref="uid" placeholder="UserId" />
                                <label>User Name</label>
                                <input type="text" className="form-control" name="userName" onChange={e=>this.onChange(e)} value={this.state.userName}  placeholder="UserName" />
                                <label>Email ID:</label>
                                <input type="text" className="form-control" name="email" onChange={e=>this.onChange(e)} value={this.state.email} placeholder="Email" />
                                <label>Address</label>
                                <input type="text" className="form-control" name="address" onChange={e=>this.onChange(e)} value={this.state.address} placeholder="Address" />
                                <label>Confirm Password</label>
                                <input type="text" className="form-control" id="cPassword" ref="cPassword" type="password" placeholder="Password" />
                                <br />
                                <button className="btn btn-primary">Create</button>&nbsp;
                                <button onClick={() => { this.toggleForm() }} className="btn btn-warning" type="button" >Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>

            );
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.renderForm()}
                </div>
            </div>
        );
    }
}

export default SignUpForm;