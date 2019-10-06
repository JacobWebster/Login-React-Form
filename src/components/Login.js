import React, { Component } from 'react';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Login extends Component  {
 
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
      `)
    } else {
      console.error('Form Invalid - Display Error Message');
    }
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
  
    switch (name) {
        case 'email':
          formErrors.email = emailRegex.test(value) 
              ? ""
              : "Invalid email address";
        break;
        case 'password':
          formErrors.password = 
            value.length < 6 
              ? "Minimum 6 characters required"
              : "";
        break;
        default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {

    const { formErrors } = this.state;

    return (
      <div className="login">
        <h1>Welcome Back</h1>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email Address  <span className="req">*</span></label>
            <input 
              className={formErrors.email.length > 0 ? "error" : null}
              type="email" 
              name="email" 
              noValidate
              onChange={this.handleChange}
              />
                {formErrors.email.length > 0 && (
                  <p className="error-message">{formErrors.email}</p>
                )}
          </div>
          <div className="field-group">
            <label htmlFor="password">Set A Password <span className="req">*</span></label>
            <input 
              className={formErrors.password.length > 0 ? "error" : null}
              type="password" 
              name="password" 
              noValidate
              onChange={this.handleChange}
              />
            {formErrors.password.length > 0 && (
              <p className="error-message">{formErrors.password}</p>
            )}
          </div>
          <p class="forgot"><a href="#">Forgot Password?</a></p>
          <div className="button-contain">
            <button type="submit" className="button">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
    
export default Login;
