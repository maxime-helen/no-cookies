"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var cookieDescriptor;
var NoCookies = {
  disable: function disable() {
    var whitelist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var documentPrototype = Object.getPrototypeOf(document);
    cookieDescriptor = Object.getOwnPropertyDescriptor(documentPrototype, 'cookie');
    Object.defineProperty(document, 'cookie', {
      get: function get() {
        var newCookies = '';
        whitelist.forEach(function (item) {
          var cookieValue = documentPrototype.cookie.split('; ').find(function (cookie) {
            return cookie.startsWith(item);
          });

          if (cookieValue) {
            newCookies += "".concat(cookieValue, "; ");
          }
        });
        return newCookies;
      },
      set: function set(cookie) {
        if (whitelist.some(function (item) {
          return cookie.startsWith(item);
        })) {
          documentPrototype.cookie = cookie;
        }
      },
      configurable: true
    });
  },
  enable: function enable() {
    if (cookieDescriptor) {
      Object.defineProperty(document, 'cookie', cookieDescriptor);
      cookieDescriptor = undefined;
    }
  }
};
var _default = NoCookies;
exports["default"] = _default;
