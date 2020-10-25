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



  render() {
    if (!(this.state.currentUser.roleMask & 1)) return <Page404 />;
    
    return (
      <>
      <NavBar />
      {this.state.showModal 
        && <EmailDialog email={this.state.curEmail} 
                        handleHideModal={() => this.handleHideModal()}
                        update={(email) => this.updateEmail(email)} />}
                      

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