import React from 'react'
import { NavBar } from '../util/NavBar'
import { Api } from '../../api'
import { Page404 } from '../util/404'
import { EmailDialog } from './EmailDialog'

export class EmailTable extends React.Component {
  api = new Api();
  headers = ['First Name', 'Last Name', 'Email Address', 'Edit', 'Delete']

  state = {
    currentUser: {},
    emails: [],
    showModal: false,
    curEmail: null,
  }

  addEmail() {
    this.api.addEmail()
      .then(() => window.location.reload(false))
  }

  deleteEmail(name, id) {
    let confirmed = window.confirm("Do you want to delete " + name + "?")
    if (!confirmed) return;

    this.api.deleteEmail(id)
      .then(() => window.location.reload(false))
  }

  openEditor(email) {
    this.setState({curEmail: email});
    this.handleShowModal();
  }







  render() {
    if (!(this.state.currentUser.roleMask & 1)) return <Page404 />;
    
    return (
      <>
      <NavBar />
      {this.state.showModal 
        && <EmailDialog email={this.state.curEmail} 
                        handleHideModal={() => this.handleHideModal()}
                        update={(email) => this.updateEmail(email)} />}
                      
      <div className="m-2 ml-4 mr-4">
          <h3 className="d-inline">Email Table</h3>
          <button className="btn btn-primary float-right"
                  onClick={() => this.addEmail()}>Create Email</button>
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
              this.state.emails.map((email, id) => (
                <tr key={id}>
                  <td>{email.firstName}</td>
                  <td>{email.lastName}</td>
                  <td>{email.email}</td>
                  <td><button style={{fontSize:"0.6em"}}
                              className="btn btn-sm btn-info w-50"
                              onClick={() => this.openEditor(email)}> Edit </button></td>
                  <td><button style={{fontSize:"0.6em"}}
                              className="btn btn-sm btn-danger w-50"
                              onClick={() => this.deleteEmail(email.email, email.id)}> Delete </button></td>
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

    this.api.getEmails()
      .then(data => {
        this.setState({emails: data.reverse()});
      })
  }
}