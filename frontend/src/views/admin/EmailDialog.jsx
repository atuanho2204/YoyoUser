import React from 'react'
import $ from 'jquery'
import ReactDOM from 'react-dom'

export class EmailDialog extends React.Component {
  wrapper = React.createRef();
  
  state = {
    email: "",
    firstName: "",
    lastName: ""
  }

  render() {
    return (
      <div className="modal" ref={this.wrapper}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Email Editor</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group row">
                  <label htmlFor="firstName" className="col-sm-3 col-form-label">First Name</label>
                  <div className="col-sm-9 mb-1">
                    <input type="text" 
                           className="form-control" 
                           id="firstName" 
                           placeholder="First Name"
                           value={this.state.firstName}
                           onChange={e => this.setState({firstName: e.target.value})}/>
                  </div>

                  <label htmlFor="lastName" className="col-sm-3 col-form-label">Last Name</label>
                  <div className="col-sm-9 mb-1">
                    <input type="text"
                           className="form-control"
                           id="lastName"
                           placeholder="Last Name"
                           value={this.state.lastName}
                           onChange={e => this.setState({lastName: e.target.value})} />
                  </div>

                  <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input type="text"
                           className="form-control"
                           id="email"
                           placeholder="Email"
                           value={this.state.email}
                           onChange={e => this.setState({email: e.target.value})} />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
              <button type="button" 
                      className="btn btn-success"
                      onClick={() => this.props.update(this.state)}
                      >Save changes</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  componentDidMount() {
    const node = this.wrapper.current;
    this.setState(this.props.email)
    $(node).modal('show');
    $(node).on('hidden.bs.modal', () => this.props.handleHideModal());
  }
}