import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Login extends React.Component {
  state = { username: '', password: '' };

  usernameChange = e => this.setState({ username: e.target.value });
  passwordChange = e => this.setState({ password: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

  }

  render() {
    const { username, password } = this.state;
    const { loading, error, users } = this.props.data;

    return (
      <form onSubmit={this.onSubmit}>
        <input onChange={this.usernameChange} value={username} />

        <input onChange={this.passwordChange} value={password} />

        <button type='submit'>Submit</button>
      </form>
    );
  }
}

const GET_USER = gql`
  query {
    users {
      username
    }
  }
`;

export default graphql(GET_USER)(Login);
