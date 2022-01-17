import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { TextField, Button, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { signup } from "../../action";
import "./style.scss";
import {
  isEmpty,
  TelephoneValidation,
  EmailValidation,
  compareElements,
} from "../../utils";

class Signup extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  renderTextField = (label, value, field, error = false, type = "text") => (
    <div>
      <div className="label">
        <div className="noselect">{label}</div>
        <div className="noselect">*</div>
      </div>
      <TextField
        variant="outlined"
        value={value}
        size="small"
        fullWidth
        type={type}
        onChange={this.onChangeValue(field)}
        error={error}
      />
    </div>
  );

  /**
   * Go to sign in page *
   */
  signin = () => {
    this.props.history.push("/signin");
  };

  signup = async () => {
    let result = await this.props.signup(this.state);
    this.setState({ submited: true });
  };
  onChangeValue = (field) => (evt) => {
    this.setState({ [field]: evt.target.value });
  };

  checkForm = () => {
    const {
      first_name,
      last_name,
      email,
      phone,
      password,
      confirmPassword,
    } = this.state;
    if (isEmpty(first_name, last_name, password)) return false;
    if (!TelephoneValidation(phone)) return false;
    if (!EmailValidation(email)) return false;
    if (!compareElements(password, confirmPassword)) return false;
    return true;
  };
  render() {
    const {
      first_name,
      last_name,
      email,
      phone,
      password,
      confirmPassword,
    } = this.state;
    return (
      <div className="signup-form">
        <div className="close-form">
          <IconButton>
            <Close />
          </IconButton>
        </div>
        <div className="description">
          <pre className="noselect">This is description</pre>
        </div>
        <div className="form-content">
          <div className="header noselect">{`Sign up`}</div>
          {this.renderTextField(
            "First name",
            first_name,
            "first_name",
            isEmpty(first_name)
          )}
          {this.renderTextField(
            "Last name",
            last_name,
            "last_name",
            isEmpty(last_name)
          )}
          {this.renderTextField(
            "Phone number",
            phone,
            "phone",
            !TelephoneValidation(phone)
          )}
          {this.renderTextField(
            "Email address",
            email,
            "email",
            !EmailValidation(email)
          )}
          {this.renderTextField(
            "Password",
            password,
            "password",
            !compareElements(password, confirmPassword),
            "password"
          )}
          {this.renderTextField(
            "Confirm password",
            confirmPassword,
            "confirmPassword",
            !compareElements(password, confirmPassword),
            "password"
          )}
          <div className="login-button">
            <div>
              <Button
                variant="contained"
                disableElevation
                color="primary"
                onClick={this.signup}
                disabled={!this.checkForm()}
              >
                Sign up
              </Button>
            </div>
          </div>
          <div className="noselect">
            {`If you have an account, go to `}
            <Button onClick={this.signin}>Sign in</Button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ router }) => ({
  router,
});
export default withRouter(
  connect(mapStateToProps, {
    signup,
  })(Signup)
);
