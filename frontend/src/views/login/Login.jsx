import React from 'react'
import { Redirect } from 'react-router-dom' 
import { Api } from '../../api'

export class Login extends React.Component {
  api = new Api();

  state = {
    loaded: false,
    redirect: false,
    username: '',
    password: ''
  };

  constructor() {
    super();
    this.api.getCurrentUser()
      .then(() => this.setState({loaded: true, redirect: true}))
      .catch(() => this.setState({loaded: true}))
  }

  login() {
    this.api.login(this.state).then(
      data => {
        if (data.auth === false) {
          alert(data.msg);
        }
        else {
          localStorage.setItem('token', data.token);
          this.setState({redirect: true});
        }
      }
    );
  }

  render() {
    if (!this.state.loaded) return null;

    if (this.state.redirect) {
      return <Redirect to='/home' />
    }
    return (
      <>
        <form className="mt-5 w-50 mx-auto">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" 
                   className="form-control" 
                   id="username" 
                   placeholder="Enter username"
                   onChange={e => this.setState({username: e.target.value})}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" 
                   className="form-control" 
                   id="password" 
                   placeholder="Enter password"
                   onChange={e => this.setState({password: e.target.value})}/>
          </div>
          <button type="button"
                  className="mt-4 btn btn-primary btn-block"
                  onClick={() => this.login()}>
            Submit        
          </button>
        </form>
      </>
    )
  } 
}