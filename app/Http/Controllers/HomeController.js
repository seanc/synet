'use strict'

const Portfolio = use('App/Model/Portfolio')
const ContactRequest = use('App/Model/ContactRequest')
const Validator = use('Validator')
const ValidatorMessages = {
  'name.required': 'Please specify your name',
  
  'email.required': 'Please specify your email',
  'email.email': 'Please provide your email in the correct format (example@mail.com)',
  
  'subject.required': 'Please specify a subject',
  'subject.min': 'Your subject should be at least 50 characters',
  
  'message.required': 'Please specify a message',
  'message.min': 'Your message should be at least 120 characters'
}

class HomeController {

  * index (request, response) {
    const items = yield Portfolio.all()
    const chunked = items.chunk(3)
    yield response.sendView('index', {
      chunks: chunked.value()
    })
  }
  
  * contact (request, response) {
    const rules = {
      'name': 'required',
      'email': 'required|email',
      'subject': 'required|min:50',
      'message': 'required|min:120'
    }
    const data = request.except('_csrf');
    const validation = yield Validator.validate(rules, data, ValidatorMessages)
    if (validation.fails()) {
      return yield response.sendView('index', {
        form_errors: validation.messages()
      })
    }
    
    Object.assign(data, {
      read: false
    })
        
    yield ContactRequest.create(data)
    yield response.sendView('index', {
      success: {
        message: 'Your inquiry has been successfully submitted'
      }
    })
  }

}

module.exports = HomeController
