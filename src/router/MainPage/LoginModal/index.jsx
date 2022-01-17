import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Modal, InputField, Button } from '../../../components'
import { loginWithEmail } from '../../../action'
class LoginModal extends Component {
  state = {
    userName: '',
    password: ''
  }
  login = () => {
    const { userName, password } = this.state;
    this.props.loginWithEmail({ userName, password });
  }
  onChange = name => evt => {
    this.setState({
      [name]: evt.target.value
    })
  }
  render() {
    const { open } = this.props;
    const { userName, password } = this.props;
    return (
      <Modal open={open} width="450px">
        <div className="subject">Login</div>
        <div className="content">
          <InputField placeholder="User name" value={userName} onChange={this.onChange('userName')} />
          <InputField placeholder="password" type="password" value={password} onChange={this.onChange('password')} />
        </div>
        <div className="actions">
          <Button textColor="white" onClick={this.login}>Login</Button>
        </div>
      </Modal>
    )
  }
}
const mapStateToProps = ({ authUser }) => ({
  authUser
});
export default withRouter(connect(mapStateToProps, {
  loginWithEmail
})(LoginModal));