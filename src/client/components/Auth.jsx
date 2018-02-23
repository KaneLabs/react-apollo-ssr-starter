import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Auth extends React.Component {
  state = { username: '', password: '' };

  usernameChange = e => this.setState({ username: e.target.value });
  passwordChange = e => this.setState({ password: e.target.value });

  onSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    console.log(username, password);

// console.log(this.props.mutate);
    const res = await this.props.mutate({ variables: this.state })

    console.log('res: ', res);

    const { createUser } = res.data;

    localStorage.setItem('user', createUser);

  }

  render() {
    const { username, password } = this.state;
    console.log(this.props);


    return (
      <form onSubmit={this.onSubmit}>
        <input onChange={this.usernameChange} value={username} />

        <input onChange={this.passwordChange} value={password} type='password' />

        <button type='submit'>Submit</button>
      </form>
    );
  }
}

// example mutation

const createUser = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

export default graphql(createUser)(Auth)
