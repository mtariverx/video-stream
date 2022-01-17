import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { EmailValidation } from "../../utils";
import {
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { loginWithEmail } from "../../action";
import "./style.scss";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  changeValue = (field) => (evt) =>
    this.setState({ [field]: evt.target.value });
  /**********************
   * Go to sing up page *
   **********************/
  signin = async () => {
    if (this.checkValidation()) {
      let result = await this.props.loginWithEmail(this.state);
      if (result) {
        // this.props.history.push('/');
        window.location.href = "/";
      }
    }
  };

  signup = () => {
    this.props.history.push("/signup");
    // this.props.history.push('/signup');
  };
  onKeyPress = (evt) => {
    if (evt.key === "Enter") {
      this.signin();
    }
  };

  checkValidation = () => {
    const { email } = this.state;
    if (!EmailValidation(email)) return false;
    return true;
  };
  render() {
    const { email } = this.state;
    return (
      <div className="login-form" onKeyPress={this.onKeyPress}>
        <div className="close-form">
          <IconButton>
            <Close />
          </IconButton>
        </div>
        <div className="description">
          <pre className="noselect">Welcome aCAS Pro!</pre>
        </div>
        <div className="form-content">
          <div className="header noselect">{`Connect to aCAS Panel`}</div>
          <TextField
            label="Enter your email"
            onChange={this.changeValue("email")}
            value={email}
            error={!EmailValidation(email)}
          />
          <TextField
            label="Enter your Password"
            type="password"
            onChange={this.changeValue("password")}
          />
          <div className="login-button">
            <div>
              <Button
                variant="contained"
                disableElevation
                color="primary"
                onClick={this.signin}
                disabled={!this.checkValidation()}
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authUser }) => ({
  authUser,
});
export default withRouter(
  connect(mapStateToProps, {
    loginWithEmail,
  })(Login)
);
