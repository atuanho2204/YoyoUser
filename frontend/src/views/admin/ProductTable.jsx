import React from 'react'
import { NavBar } from '../util/NavBar'
import { Api } from '../../api'
import { Page404 } from '../util/404'

export class ProductTable extends React.Component {
  api = new Api();
  headers = ['Product Name', 'Edit', 'Delete']

  state = {
    currentUser: {},
    products: []
  }

  addProduct() {
    this.api.addProduct()
      .then(() => window.location.reload(false))
  }

  deleteProduct(name, id) {
    let confirmed = window.confirm("Do you want to delete " + name + "?")
    if (!confirmed) return;

    this.api.deleteProduct(id)
      .then(() => window.location.reload(false))
  }

  editProduct(name, id) {
    let newName = window.prompt("Enter product's name", name);
    if (newName != null) {
      this.api.updateProduct({name: newName, id: id})
        .then(() => window.location.reload(false))
    }
  }
  render() {
    if (!(this.state.currentUser.roleMask & 1)) return <Page404 />;
    return ()
  }
  componentDidMount() {
    this.api.getCurrentUser()
      .then(data => this.setState({currentUser: data}))

    this.api.getProducts()
      .then(data => {
    this.setState({products: data.reverse()});
      })
    }
  }
}