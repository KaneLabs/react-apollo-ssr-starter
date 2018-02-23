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
    const { login } = this.props;
    const { username, password } = this.state;

    login(username, password);
  }

  render() {
    const { username, password } = this.state;
    const { loading, error, user } = this.props.data;

    if (loading) return (<p>loading...</p>);

    if (error) return (<p>{error}</p>);

    if (user) return (<p>Logged in as {user.username}</p>)
  }
}

const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      username
    }
  }
`;

export default graphql(GET_USER, {
  options: props => (
    { variables: { id: props.match.params.id } }
  )
})(Login);
