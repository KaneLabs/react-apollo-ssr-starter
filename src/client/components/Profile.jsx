import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Profile extends React.Component {
  render() {
    const { loading, error, user } = this.props.data;

    if (loading) return (<p>loading...</p>);

    if (error) return (<p>{error}</p>);

    if (user) return (
        <p style={{ color: 'rgba(255,255,255,0.87)' }}>Logged in as @{user.name}</p>
    )
  }
}

const GET_USER = gql`
  query user($name: String!) {
    user(name: $name) {
      name
    }
  }
`;

export default graphql(GET_USER, {
  options: props => (
    { variables: { name: props.match.params.name } }
  )
})(Profile);
