import React, { Component } from 'react';
import { Signup } from '../../components';
export default class SignupPage extends Component {
  render() {
    return (
      <div className='login-page'>
        <div className='login-component'>
          <Signup />
        </div>
      </div>
    )
  }
}
