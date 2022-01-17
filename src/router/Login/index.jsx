import React, { Component } from 'react';
import { Login } from '../../components';
import './style.scss';
import { connect } from 'react-redux'
class LoginPage extends Component {
  render() {
    return (
      <div className='login-page'>
        <div className='login-component'>
          <Login />
        </div>
      </div>
    )
  }
}
const mapStateToProps = () => ({
})

export default connect(mapStateToProps, null)(LoginPage);