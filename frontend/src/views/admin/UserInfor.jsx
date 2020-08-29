import React from 'react'
import { NavBar } from '../util/NavBar'
import { Page404 } from '../util/404'
import { Api } from '../../api'

export class UserInfo extends React.Component {
  api = new Api();

  state = {
    roles: [],
    oldName: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
    currentUser: {
      roleMask: 0,
    }
  }

  constructor() {
    super();
    this.api.getCurrentUser()
      .then(data => this.setState({currentUser: data}))
  }


  update() {
    if (this.state.newPassword !== this.state.confirmPassword) {
      alert("Your new password and confirmed password do not match");
      return;
    }
    this.api.updateUser(this.state)
      .then(data => {
        alert(data.msg)
        window.location.reload(false);
      });

  }

  render() {
    if (!(this.state.currentUser.roleMask & 1)) return <Page404 />;
    return  (
      <>
        <NavBar />
        <div className="m-2 ml-4 mr-4">
          <h3>User {this.state.oldName}'s Information</h3>
          <hr />
        </div>
        <form className="w-75 mx-auto">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text"
                   className="form-control"
                   id="firstName"
                   value={this.state.firstName}
                   placeholder="First Name"
                   onChange={e => this.setState({firstName: e.target.value})}/>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text"
                   className="form-control"
                   id="lastName"
                   value={this.state.lastName}
                   placeholder="Last Name"
                   onChange={e => this.setState({lastName: e.target.value})}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email"
                   className="form-control"
                   id="email"
                   value={this.state.email}
                   placeholder="Email"
                   onChange={e => this.setState({email: e.target.value})}/>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text"
                   className="form-control"
                   id="username"
                   value={this.state.username}
                   placeholder="Username"
                   onChange={e => this.setState({username: e.target.value})}/>
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password (leave empty if you don't want to change password)</label>
            <input type="password"
                   className="form-control"
                   id="newPassword"
                   placeholder="Enter a new password"
                   onChange={e => this.setState({newPassword: e.target.value})}/>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmed Password</label>
            <input type="password"
                   className="form-control"
                   id="confirmPassword"
                   placeholder="Enter your new password again"
                   onChange={e => this.setState({confirmPassword: e.target.value})}/>
          </div>
          <div>
            Roles:
          </div>
          {
          this.state.roles.map((item, id) => (
            <div className="form-check" key={id}>
              <input id={`${item.path}-check`}
                     type="checkbox"
                     className="form-check-input"
                     defaultChecked={this.state.roleMask & (1 << item.id)}
                     onChange={e => {
                        this.setState({roleMask: this.state.roleMask ^ (1 << item.id)})
                      }}/>
              <label className="form-check-label"
                     htmlFor={`${item.path}-check`}>{item.name}</label>
            </div>
          ))
          }

          <button type="button"
                  className="mt-4 btn btn-primary btn-block"
                  onClick={() => this.update()}>
            Update information
          </button>
        </form>
      </>
    )
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.api.getUserById(id)
      .then(
        data => {
          this.setState(data)
          this.setState({oldName: data.firstName + ' ' + data.lastName})
        }
      )
      .catch(() => {
        alert("Invalid user");
        this.props.history.goBack();
      })
    this.api.getRoles()
      .then(
        data => {
          data.unshift({name: 'Admin', id: '0', path: 'admin'})
          this.setState({roles: data})
        }
      )
  }
}
