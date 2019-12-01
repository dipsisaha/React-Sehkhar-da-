import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import LoginForm from './LoginForm';
import Student from './Student';
import Posts from './Components/Posts';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            isPostBtnEnbl: true,
            isOpen: true,
            panel: '',
            postPanel: '',
            students: [
                {
                    _id: '',
                    userName: '',
                    address: '',
                    image: '',
                    email: '',
                    like: 0,
                    comments: []
                }
            ],
            posts: [
                {
                    id: '001',
                    post: 'Hello....Good Morning...',
                    image: '',
                    like: 2,
                    comments: []
                },
                {
                    id: '002',
                    post: '.',
                    image: 'images/bachha.jpg',
                    like: 4,
                    comments: [
                        "good",
                        "very good"
                    ]
                }
            ]
        }
    }
    onUpdateLike(Students) {
        let { students } = this.state;
        var commentIndex = students.findIndex(function (c) {
            return c.userName === Students.userName;
        });
        students[commentIndex].like++;
        console.log(students[commentIndex].like);
        this.setState({ students: students });
    }

    loadData() {
        let apiUrl = "http://localhost:3020/student";
        fetch(apiUrl, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => this.renderUser(data));
    }

    onUpdateComment = (Students, e) => {
        let { students } = this.state;
        var commentIndex = students.findIndex(function (c) {
            return c.userName === Students.userName;
        });
        students[commentIndex].comments.push(e.target.value);
        e.target.value = '';
        console.log(e.target.value);
        this.setState({ students: students });
    }

    toggleForm() {
        let { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    togglePostBtn() {
        let { isPostBtnEnbl } = this.state;
        this.setState({ isPostBtnEnbl: !isPostBtnEnbl });
    }

    onPostComments(e) {
        let fieldValue = e.target.value;
        let { isPostBtnEnbl } = this.state;
        if (fieldValue.length > 0 && isPostBtnEnbl === true) {

            this.setState({ isPostBtnEnbl: false });;
        } else if (fieldValue.length === 0) {
            this.setState({ isPostBtnEnbl: true });;
        }
    }
    //this method is for hardcoded data
    // renderUser() {
    //     let { students, panel } = this.state;
    //     panel = students.map((student, idx) => {
    //         return <Student addLikes={(item) => { this.onUpdateLike(item) }}
    //             addComments={this.onUpdateComment}
    //             student={student} onUpdate={this.onUpdate} key={idx} />;
    //     });
    //     this.setState({ panel: panel });
    // }


    renderPost() {
        let { posts, postPanel } = this.state;
        postPanel = posts.map((post, idx) => {
            return <Posts addLikes={(item) => { this.onUpdateLike(item) }}
                addComments={this.onUpdateComment}
                posts={post} onUpdate={this.onUpdate} key={idx} />;
        });
        this.setState({ postPanel: postPanel });
    }

    renderUser(newStudents) {
        console.log('REST Api call::' + newStudents);
        let { students, panel } = this.state;
        panel = newStudents.map((student, idx) => {
            return <Student addLikes={(item) => { this.onUpdateLike(item) }}
                addComments={this.onUpdateComment}
                student={student} onUpdate={this.onUpdate} key={idx} />;
        });
        this.setState({
            panel: panel,
            students: newStudents
        });
    }

    // addPost() {
    //     let { posts } = this.state;
    //     let data = { id: '004', post: '', image: '', like: 0, comments: [] };
    //     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>' + posts);
        
    //     posts.push(data);
    //     console.log('>>*****************************' + posts);
    //     //let newdata = Object.assign(posts, data);
    //     this.setState({ posts: posts });

    // }

    submitFormHandle(e) {
        e.preventDefault();
        let { posts } = this.state;
        let data = { id: '004', post: this.refs.posts.value, image: '', like: 0, comments: [] };
        posts.push(data);
        this.refs.posts.value="";
        //let newdata = Object.assign(posts, data);
        this.setState({ posts: posts });
    }

    render() {
        let { user, isOpen, panel, posts, postPanel } = this.state;

        if (!isOpen) {
            return (
                <LoginForm />
            )
        } else {
            postPanel = posts.reverse().map((post, idx) => {
                return <Posts addLikes={(item) => { this.onUpdateLike(item) }}
                    addComments={this.onUpdateComment}
                    posts={post} onUpdate={this.onUpdate} key={idx} />;
            });
            return (
                <Router>
                    <form onSubmit={(e) => { this.submitFormHandle(e) }}>
                    <div className="card" >
                        <div className="card-header">
                            <span className="card-title-right">Welcome {user}</span>
                            <button className="btn btn-link" onClick={() => { this.toggleForm() }}>
                                Sign Out
                            </button> &nbsp;
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <button className="btn btn-link" onClick={() => this.loadData()}>View User</button></li>
                        </ul>
                        <div className="card-Borda">&nbsp;
                            <textarea className="form-control" cols="50" ref="posts" onChange={(e) => this.onPostComments(e)}></textarea>
                            &nbsp;
                            <button className="btn btn-info" disabled={this.state.isPostBtnEnbl}
                                >Post</button>

                        </div>
                        {postPanel}
                        <div className="row">
                        </div>
                        <div className="list-group-item">
                            <div className="row">
                                {panel}
                            </div>
                        </div>
                    </div>
                    </form>
                </Router>
            )
        }
    }
}

export default Dashboard;