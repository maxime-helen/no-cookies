'use strict'

let cookieDescriptor

const NoCookies = {
  disable: (whitelist = []) => {
    const documentPrototype = Object.getPrototypeOf(document)
    cookieDescriptor = Object.getOwnPropertyDescriptor(documentPrototype, 'cookie')
    Object.defineProperty(document, 'cookie', {
      get: () => {
        let newCookies = ''
        whitelist.forEach(item => {
          const cookieValue = documentPrototype
            .cookie
            .split('; ')
            .find(cookie => cookie.startsWith(item))
          if (cookieValue) {
            newCookies += `${cookieValue}; `
          }
        })
        return newCookies
      },
      set: (cookie) => {
        if (whitelist.some(item => cookie.startsWith(item))) {
          documentPrototype.cookie = cookie
        }
      },
      configurable: true
    })
  },
  enable: () => {
    if (cookieDescriptor) {
      Object.defineProperty(document, 'cookie', cookieDescriptor)
      cookieDescriptor = undefined
    }
  }
}

export default NoCookies
