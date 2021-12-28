import React from "react";
import Spinner from "../Spinner/Spinner";
import SMART_BRAIN_API_URL from "../../api/api";
import "./Signin.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      isLoading: false,
      errorText: ""
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
    this.setState({ errorText: '' });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
    this.setState({ errorText: '' });
  };

  saveAuthTokenInSessions = (token) => {
    window.localStorage.setItem("token", token);
  };

  onSubmitSignIn = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    fetch(`${SMART_BRAIN_API_URL}/signin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success === "true") {
          this.saveAuthTokenInSessions(data.token);
          this.props.loadUser(data.user);
          this.props.onRouteChange("home");
        }else {
          this.setState({errorText: data});
        }
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log(err)});
  };

  render() {
    const { onRouteChange } = this.props;
    return this.state.isLoading ? (
      <Spinner subText="Signing in..." />
    ) : (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <form onSubmit={this.onSubmitSignIn}>
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                    required={true}
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                    required={true}
                    type="password"
                    name="password"
                    id="password"
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
                  value="Sign in"
                />
              </div>
            </form>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
