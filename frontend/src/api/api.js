import axios from 'axios'

export class Api {
  url = 'http://localhost:8000';

  config = {
    headers: {
      authorization: 'cuom1999',
    }
  }

  login(form) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/api/login`, form, this.config)
          .then(x => resolve(x.data))
          .catch(x => {
              alert(x);
              reject(x);
          })
    })
  }

  getUserByToken(token) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/api/login/${token}`, this.config)
          .then(x => resolve(x.data))
          .catch(x => {
              reject(x);
          })
    })
  }

  async getCurrentUser() {
    let user = null;
    await this.getUserByToken(localStorage.getItem('token'))
      .then(data => user = data)
    return user;
  }

  getUserById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/api/users/${id}`, this.config)
          .then(x => resolve(x.data))
          .catch(x => {
            reject(x);
          })
    })
  }

  getRoles() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/api/roles`, this.config)
          .then(x => resolve(x.data))
          .catch(x => {
              alert(x);
              reject(x);
          })
    })
  }

  addUser() {
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/api/users/new`, {}, this.config)
          .then(x => resolve(x.data))
          .catch(x => {
              alert(x);
                reject(x);
          })
    })
  }

  updateUser(form) {
    return new Promise((resolve, reject) => {
      axios.put(`${this.url}/api/users`, form, this.config)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        })
    })
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/api/users`, this.config)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        })
    })  
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${this.url}/api/users/${id}`, this.config)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        })
    })  
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/api/products`, this.config)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        })
    })  
  }

  addProduct() {
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/api/products/new`, {}, this.config)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        })
    })  
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${this.url}/api/products/${id}`, this.config)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        })
    })  
  }

  updateProduct(form) {
    return new Promise((resolve, reject) => {
      axios.put(`${this.url}/api/products`, form, this.config)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        })
    })
  }

  getEmails() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/api/emails`, this.config)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        })
    })  
  }

  addEmail() {
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/api/emails/new`, {}, this.config)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        })
    })  
  }

  deleteEmail(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${this.url}/api/emails/${id}`, this.config)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        })
    })  
  }

  updateEmail(form) {
    return new Promise((resolve, reject) => {
      axios.put(`${this.url}/api/emails`, form, this.config)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        })
    })
  }

}