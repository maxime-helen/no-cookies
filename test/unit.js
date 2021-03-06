import assert from 'assert';
import NoCookies from '../index';

let cookieTestValue = '';

describe('Unit test suit', () => {
  beforeEach('Mock document.cookie', () => {
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

  afterEach('Cleanup document', () => {
    global.document = undefined;
    cookieTestValue = '';
  });

  it('disable() prevents accessors to cookie', () => {
    cookieTestValue = 'foo=1; ';
    assert(document.cookie === cookieTestValue);
    NoCookies.disable();
    assert(document.cookie === '');
    document.cookie = 'bar=1; ';
    assert(document.cookie === '');
  });

  it('disable() with whitelisted cookie allows accessors', () => {
    cookieTestValue = 'foo=1; bar=2; ';
    assert(document.cookie === cookieTestValue);
    NoCookies.disable(['foo']);
    assert(document.cookie === 'foo=1; ');
    document.cookie = 'foo=2; ';
    assert(document.cookie === 'foo=2; ');
  });

  it('disable() and set whitelisted cookie', () => {
    cookieTestValue = 'foo=1; ';
    assert(document.cookie === cookieTestValue);
    NoCookies.disable(['bar']);
    assert(document.cookie === '');
    document.cookie = 'bar=2; ';
    assert(document.cookie === 'bar=2; ');
  });

  it('enable() without prior disable() does nothing', () => {
    cookieTestValue = 'foo=1; ';
    NoCookies.enable();
    assert(document.cookie === cookieTestValue);
    document.cookie = 'foo=2; ';
    assert(document.cookie === 'foo=2; ');
  });

  it('enable() after prior disable() sets back native behavior', () => {
    cookieTestValue = 'foo=1; ';
    assert(document.cookie === cookieTestValue);
    NoCookies.disable();
    assert(document.cookie === '');
    NoCookies.enable();
    assert(document.cookie === cookieTestValue);
    document.cookie = 'foo=2; ';
    assert(document.cookie === 'foo=2; ');
  });
});
