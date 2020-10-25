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

  handleHideModal() {
    this.setState({showModal: false})
  }

  handleShowModal(){
    this.setState({showModal: true})
  }

  updateEmail(email) {
    this.api.updateEmail(email)
      .then(() => window.location.reload(false))
  }

  render() {
    if (!(this.state.currentUser.roleMask & 1)) return <Page404 />;
    
    return (
      <>

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