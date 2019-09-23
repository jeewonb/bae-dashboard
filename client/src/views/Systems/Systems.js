import React, { Component } from 'react';
import Modal from 'react-modal';
import Validation from 'react-validation';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Textarea from 'react-validation/build/textarea';
import '../validation.js';

export default class Systems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            createModalIsOpen: false,
            updateModalIsOpen: false,
            name: '',
            email: '',
            msg: '',
            id: ''
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
        this.handleSubmit = this.handleSubmit.bind(this); // Function where we submit data
    }

    
    
    openModal(system) {
        if (system != "create") {
            this.setState({
                updateModalIsOpen: true,
                name: system.NAME,
                description: system.DESCRIPTION,
                id: system.ID
            }, function () {
                console.log(this.state.value);
            });
        }
        else{
            this.setState({
                createModalIsOpen: true
            })
        }
    }

    closeModal() {
        this.setState({
            createModalIsOpen: false,
            updateModalIsOpen: false
        });
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        var data = {
            name: e.target.name.value,
            description: e.target.description.value,
        }
        console.log(data)
        fetch("http://localhost:9000/systems/add", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            if (data == "success") {
                this.setState({ msg: "Thanks for registering" });
            }
        }).catch(function (err) {
            console.log(err)
        });
        this.closeModal();
    }

    handleEdit(e) {
        //Edit functionality
        e.preventDefault()
        var data = {
            name: e.target.name.value,
            description: e.target.description.value,
            id: this.state.id
        //     name: this.state.name,
        //     description: this.state.description,
        //     id: this.state.id
        }
        console.log(data);
        console.log(JSON.stringify(data));

        fetch("http://localhost:9000/systems/edit", {
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
        this.closeModal();
    }

    deleteMember(system) {
        var data = {
            id: system.ID
        }
        fetch("http://localhost:9000/systems/delete", {
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
        fetch('http://localhost:9000/systems')
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    render() {
        return (

            <div className="container">
                <div className="container register-form">
      
                <td><a onClick={() => this.openModal("create")}>Create</a> </td>
                    <Modal
                        isOpen={this.state.createModalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Create Modal" >
                        <form onSubmit={this.handleSubmit} method="POST">
                            <label>ID</label>
                            <input onChange={this.logChange} className="form-control" value={this.state.id} placeholder='' name='id' validations={['required']} />
                            <label>Name</label>
                            <input onChange={this.logChange} className="form-control" value={this.state.name} placeholder='' name='name' validations={['required']} />
                            <label>Description</label>
                            <input onChange={this.logChange} className="form-control" value={this.state.description} placeholder='' name='description' validations={['required']} />
                            <div className="submit-section">
                            <button className="btn btn-uth-submit">Save</button>
                                </div>
                            </form>
                    </Modal>
                </div>

                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(system =>
                                <tr key={system.ID}>
                                    <td>{system.NAME} </td>
                                    <td>{system.DESCRIPTION}</td>
                                    <td><a onClick={() => this.openModal(system)}>Edit</a>|
                            <a onClick={() => this.deleteMember(system)}>Delete</a></td>
                                </tr>
                            )}
                            <Modal
                                isOpen={this.state.updateModalIsOpen}
                                onRequestClose={this.closeModal}
                                contentLabel="Update Modal" >
                                <form onSubmit={this.handleEdit} method="POST">
                                    <label>Name</label>
                                    <input onChange={this.logChange} className="form-control" value={this.state.name} placeholder='' name='name' validations={['required']} />
                                    <label>Description</label>
                                    <input onChange={this.logChange} className="form-control" value={this.state.description} placeholder='' name='description' validations={['required']} />
                                    <div className="submit-section">
                                        <button className="btn btn-uth-submit">Save</button>
                                    </div>
                                </form>
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
                            {/* <form onSubmit={this.handleEdit} method="POST">
                                <label>Name</label>
                                <input onChange={this.logChange} className="form-control" value={this.state.name} placeholder='' name='name' validations={['required']} />
                                <label>Description</label>
                                <input onChange={this.logChange} className="form-control" value={this.state.description} placeholder='' name='description' validations={['required']} />
                                <div className="submit-section">
                                    <button className="btn btn-uth-submit">Save</button>
                                </div>
                            </form> */}
                            </Modal>
                        </tbody>
                    </table>
            </div>
            </div >
        );
    }
}