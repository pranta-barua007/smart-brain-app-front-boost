import React from 'react';
import Spinner from '../Spinner/Spinner';
import SMART_BRAIN_API_URL from '../../api/api';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      isLoading: false,
      errorText: ""
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value});
    this.setState({ errorText: '' });
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
    this.setState({ errorText: '' });
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value});
    this.setState({ errorText: '' });
  }

  saveAuthTokenInSessions = (token) => {
    window.localStorage.setItem("token", token);
  };

  onSubmitRegister = (e) => {
    e.preventDefault();
    this.setState({isLoading: true});
    fetch(`${SMART_BRAIN_API_URL}/register`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(data => {
        const {user, token} = data;
        this.saveAuthTokenInSessions(token);
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }else {
          this.setState({errorText: user});
        }
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log(err)});
  }

  render() {
    return this.state.isLoading ? <Spinner subText="Registering user ..." /> : (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <form onSubmit={this.onSubmitRegister}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="text"
                  name="name"
                  id="name"
                  required={true}
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required={true}
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="password"
                  name="password"
                  id="password"
                  required={true}
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div style={{color: 'red'}}>
              {this.state.errorText && <p>{this.state.errorText}</p>}
            </div>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
            </form>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;