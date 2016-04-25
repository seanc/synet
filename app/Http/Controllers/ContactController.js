'use strict'

const ContactRequest = use('App/Model/ContactRequest')

class ContactController {
  
    * index (request, response) {
        const requests = yield ContactRequest.all()
        yield response.sendView('contact', {
            requests: requests.value(),
            user: request.cookie('user', {})
        })
    }
    
    * show (request, response) {
        const requestID = request.param('id')
        const req = yield ContactRequest.where('id', '=', parseInt(requestID))
        const item = yield ContactRequest.find(req[0].id)
        item.read = true
        yield item.update()        
        yield response.sendView('contact-view', req[0])
    }
}

module.exports = ContactController
