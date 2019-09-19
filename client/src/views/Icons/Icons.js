import React, { Component } from 'react';
import Modal from 'react-modal';
import Validation from 'react-validation';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Textarea from 'react-validation/build/textarea';
import '../validation.js';

export default class Icons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            modalIsOpen: false,
            name: '',
            email: '',
            msg: '',
            id: 0
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
        this.handleSubmit = this.handleSubmit.bind(this); // Function where we submit data
    }

    openModal(member) {
        this.setState({
            modalIsOpen: true,
            name: member.name,
            email: member.email,
            id: member.id
        }, function () {
            console.log(this.state.value);
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            name: this.state.name,
            email: this.state.email,
            bloodGroup: this.state.bloodGroup,
            phone_number: this.state.phone_number,
            dob: this.state.dob
        }
        console.log(data)
        fetch("http://localhost:9000/users/add", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)    
            if(data == "success"){
               this.setState({msg: "Thanks for registering"});  
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

    handleEdit(event) {
        //Edit functionality
        event.preventDefault()
        var data = {
            // name: event.target.name.value,
            // email: event.target.email.value,
            // id: event.target.id.value
            name: this.state.name,
            email: this.state.email,
            bloodGroup: this.state.bloodGroup,
            phone_number: this.state.phone_number,
            dob: this.state.dob,
            id: this.state.id
        }
        console.log(data);
        console.log(JSON.stringify(data));

        fetch("http://localhost:9000/users/edit", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((respData) => {
            console.log(respData);
        }).catch(function (err) {
            console.log(err);
        });
    }

    deleteMember(member) {
        var data = {
            id: member.id
        }
        fetch("/users/delete", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            if (data === "success") {
                this.setState({ msg: "User has been deleted." });
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    eventHandler(event, idx) {
        let updatedArr = this.state.toggleIdxArray.slice();
        let checkIdx = updatedArr.indexOf(idx);
        if (checkIdx === -1) updatedArr.push(idx);
        else updatedArr.splice(checkIdx, 1);
        this.setState((prevState) => ({
            toggleIdxArray: updatedArr
        })
        );
    }
    componentDidMount() {
        Modal.setAppElement('body');
        fetch('http://localhost:9000/users')
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    render() {
        return (
            
            <div className="container">
                <div className="container register-form">
            <form onSubmit={this.handleSubmit} method="POST">
                <label>Name</label>
                <input onChange={this.logChange} className="form-control" value={this.state.name} placeholder='John' name='name' validations={['required']}/>
                <label>Email</label>
                <input onChange={this.logChange} className="form-control" value={this.state.email} placeholder='email@email.com' name='email' validations={['required', 'email']}/>
                <label>bloodGroup</label>
                <input onChange={this.logChange} className="form-control" value={this.state.bloodGroup} placeholder='O' name='bloodGroup' validations={[]}/>
                <label>phone_number</label>
                <input onChange={this.logChange} className="form-control" value={this.state.phone_number} placeholder='01012345678' name='phone_number' validations={[]}/>
                <label>dob</label>
                <input onChange={this.logChange} className="form-control" value={this.state.dob} placeholder='ai' name='dob' validations={[]}/>
                <div className="submit-section">
                    <button className="btn btn-uth-submit">Create</button>
                </div>
            </form>
        </div>

                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Member name</th>
                                <th>Member email</th>
                                <th>Blood Group</th>
                                <th>Phone number</th>
                                <th>Dob</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(member =>
                                <tr key={member.id}>
                                    <td>{member.name} </td>
                                    <td>{member.email}</td>
                                    <td>{member.bloodGroup}</td>
                                    <td>{member.phone_number}</td>
                                    <td>{member.dob}</td>
                                    <td><a onClick={() => this.openModal(member)}>Edit</a>|
                            <a onClick={() => this.deleteMember(member)}>Delete</a></td>
                                </tr>
                            )}
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onRequestClose={this.closeModal}
                                contentLabel="Example Modal" >
                                {/* <Form onSubmit={this.handleEdit} method="POST">
                            <label>Name</label>
                            <Input onChange={this.logChange} className="form-control" value={this.state.name} placeholder='John' name='name' validations={['required']}/>
                            <label>Email</label>
                            <Input onChange={this.logChange} className="form-control" value={this.state.email} placeholder='email@email.com' name='email' validations={['required', 'email']}/>
                            <div className="submit-section">
                            <Button className="btn btn-uth-submit">Submit</Button>
                            </div>
                        </Form> */}
                                {/* <Form onSubmit={this.handleEdit} method="POST">
                                    <div className="row">
                                        <div className="small-12 columns">
                                            <h3>Leave a comment</h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="small-12 medium-4 columns">
                                            <label>
                                                <Input
                                                    onFocus={this.removeApiError}
                                                    ref={c => { this.userInput = c }}
                                                    placeholder="username"
                                                    type="text"
                                                    value="Username"
                                                    name="username"
                                                    validations={['required']}
                                                />
                                            </label>
                                        </div>
                                        <div className="small-12 medium-8 columns">
                                            <label>
                                                <Textarea
                                                    placeholder="Leave your comment..."
                                                    value="Comment"
                                                    name="comment"
                                                    validations={['required']}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="small-12 medium-6 columns">
                                            <Button className="button">Submit</Button>
                                        </div>
                                    </div>
                                </Form> */}
                            <form onSubmit={this.handleEdit} method="POST">
                            <label>Name</label>
                            <input onChange={this.logChange} className="form-control" value={this.state.name} placeholder='John' name='name' validations={['required']}/>
                            <label>Email</label>
                            <input onChange={this.logChange} className="form-control" value={this.state.email} placeholder='email@email.com' name='email' validations={['required', 'email']}/>
                            <div className="submit-section">
                            <button className="btn btn-uth-submit">Submit</button>
                            </div>
                        </form>
                            </Modal>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}