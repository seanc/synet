'use strict'

class DashboardController {

  * index (request, response) {
    yield response.sendView('dashboard', {user: request.cookie('user', false)})
  }

  * login (request, response) {
    yield response.sendView('login')
  }
  
}

module.exports = DashboardController
