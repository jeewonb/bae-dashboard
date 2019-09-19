import React, { Component } from "react";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            members: [],
            member: {
                id: '002',
                name: 'yoonjin',
                bloodGroup: 'AB',
                email: 'yoonjin@gmail.com',
                phone_number: '01034343434'
            }
        };
    }

    componentDidMount() {
        this.getMembers();
    }

    getMembers = _ => {
        fetch('http://localhost:9000/users')
        .then(response => response.json())
        .then(response => this.setState({ member: response.data}))
        .catch(err => console.log(err))
      }

    renderUser = ({id, name, bloodGroup, email, phone_number}) => <div key={id}>{name} | {bloodGroup} | {email} | {phone_number}</div>

    addUser = _ => {
        const { member } = this.state
        fetch(`http://localhost:9000/users/add?name=${member.name}&bloodGroup=${member.bloodGroup}&email=${member.email}&phone_number=${member.phone_number}`)
        .then(this.getMembers)
        .catch( err => console.log(err))
    }

    render() {
        const { members, member } = this.state
        return (
          <div className="App">
            {members.map(this.renderUser)}
    
            <div>
              <input
                value={member.name}
                onChange={e => this.setState({ member: {...member, name:e.target.value}})} />
                <input
                value={member.bloodGroup}
                onChange={e => this.setState({ member: {...member, bloodGroup:e.target.value}})} />
                <input
                value={member.email}
                onChange={e => this.setState({ member: {...member, email:e.target.value}})} />
                <input
                value={member.phone_number}
                onChange={e => this.setState({ member: {...member, phone_number:e.target.value}})} />
                <button onClick={this.addUser}> Submit </button>
            </div>
          </div>
        );
    }
}

export default App;