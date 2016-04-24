'use strict'

const Portfolio = use('App/Model/Portfolio')

class HomeController {

  * index (request, response) {
    const items = yield Portfolio.all()
    const chunked = items.chunk(3)
    yield response.sendView('index', {
      chunks: chunked.value()
    })
  }

}

module.exports = HomeController
