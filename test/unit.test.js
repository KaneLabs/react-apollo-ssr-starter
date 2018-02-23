const { describe, it } = require('mocha');
const { expect } = require('chai');

const { API_URL } = require('../src/utils');

describe('API_URL', () => {
  it ('has correct url', () => {
    if (process.env.NODE_ENV === 'production') {
      expect(API_URL).to.not.equal('http://localhost:3030');
    } else {
      expect(API_URL).to.deep.equal('http://localhost:3030');
    }
  });
});
