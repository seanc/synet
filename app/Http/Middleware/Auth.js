'use strict'

class Auth {

  * handle (request, response, next) {
    if(!request.cookie('user', false)) {
      return response.redirect('/admin/login')
    }
    yield next
    // yield next once middleware expectation
    // have been satisfied
  }

}

module.exports = Auth
