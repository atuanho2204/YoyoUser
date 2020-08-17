import React from 'react'
import { NavBar } from '../util/NavBar'
import { Page404 } from '../util/404'
import { Api } from '../../api'
import { Link } from 'react-router-dom'

export class UserTable extends React.Component {
  api = new Api();
  state = {
    currentUser: {
      roleMask: 0,
    },
    users: []
  }

  headers = [
    'First Name', 'Last Name', 'Username', 'Password', 'Email', 'Edit', 'Delete'
  ];


  addUser() {
    this.api.addUser()
      .then(() => window.location.reload(false))
  }

  deleteUser(name, id) {
    let confirmed = window.confirm("Do you want to delete " + name + "?")
    if (!confirmed) return;

    this.api.deleteUser(id)
      .then(() => window.location.reload(false))
  }

  render() {
    if (!(this.state.currentUser.roleMask & 1)) return <Page404 />;

    return (
      <>
        <NavBar/>
        <div className="m-2 ml-4 mr-4">
          <h3 className="d-inline">User Table</h3>
          <button className="btn btn-primary float-right"
                  onClick={() => this.addUser()}>Create User</button>
          <hr />
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
              {
              this.headers.map((item, id) => (
                <th scope="col" key={id}>{item}</th>
              ))
              }
              </tr>
            </thead>
            <tbody>
              {
              this.state.users.map((user, id) => (
                <tr key={id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.email}</td>
                  <td><Link style={{fontSize:"0.6em"}} to={`/admin/info/${user.id}`} className="btn btn-sm btn-info" > Edit </Link></td>
                  <td><button style={{fontSize:"0.6em"}}
                              className="btn btn-sm btn-danger"
                              onClick={() => this.deleteUser(user.firstName, user.id)}> Delete </button></td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      </>
    )
  }

  componentDidMount() {
    this.api.getCurrentUser()
      .then(data => this.setState({currentUser: data}))

    this.api.getUsers()
      .then(data => {
        this.setState({users: data.reverse()});
      })
  }
}
