'use strict';

import assert from 'assert';
import NoCookies from '../index';

let cookieTestValue = '';

describe('Unit test suit', function() {

  beforeEach('Mock document.cookie', function() {
    let mockedDocument = {};
    Object.defineProperty(mockedDocument, 'cookie', {
      get: () => cookieTestValue,
      set: (newCookies) => {
        cookieTestValue = newCookies;
      },
      configurable: true,
    });
    mockedDocument = Object.create(mockedDocument);
    global.document = mockedDocument;
  });

  afterEach('Cleanup document', function() {
    global.document = undefined;
    cookieTestValue = '';
  });

  it('Disable prevents accessors to cookie', function() {
    cookieTestValue = 'foo=1; ';
    assert(document.cookie === cookieTestValue, true);
    NoCookies.disable();
    assert(document.cookie === '', true);
    document.cookie = 'bar=1; ';
    assert(document.cookie === '', true);
  });

  it('Whitelisting cookie at disable', function() {
    cookieTestValue = 'foo=1; bar=2; ';
    assert(document.cookie === cookieTestValue, true);
    NoCookies.disable(['foo']);
    assert(document.cookie === 'foo=1; ', true);
    document.cookie = 'foo=2; ';
    assert(document.cookie === 'foo=2; ', true);
  });

  it('Set whitelisted cookie', function() {
    cookieTestValue = 'foo=1; ';
    assert(document.cookie === cookieTestValue, true);
    NoCookies.disable(['bar']);
    assert(document.cookie === '', true);
    document.cookie = 'bar=2; ';
    assert(document.cookie === 'bar=2; ', true);
  });

  it('Enable back cookie after disable', function() {
    cookieTestValue = 'foo=1; ';
    assert(document.cookie === cookieTestValue, true);
    NoCookies.disable();
    assert(document.cookie === '', true);
    NoCookies.enable();
    assert(document.cookie === cookieTestValue, true);
    document.cookie = 'foo=2; ';
    assert(document.cookie === 'foo=2; ', true);
  });

});
