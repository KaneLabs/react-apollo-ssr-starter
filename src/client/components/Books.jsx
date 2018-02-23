import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Books extends React.Component {
  mapBooks = books => books.map(book => <li key={book.id}>{book.title}</li>);

  renderList = books => ([
    <h2 style={{ padding: '.75em 1.25em' }}>Books</h2>,
    <ul>{this.mapBooks(books)}</ul>
  ])

  render() {
    const { books, loading, error } = this.props.data;

    if (loading) return <p>loading..</p>
    if (error) return <p>{error}</p>
    if (books) return this.renderList(books);
  }
}

const GET_BOOKS = gql`query { books { title, id } }`;

export default graphql(GET_BOOKS)(Books);
