'use strict'

const Lucid = use("Lucid")

class ContactRequest extends Lucid {
  
  static get table () {
    return 'contact_requests'
  }
  
  static get softDeletes () {
    return false
  }
  
}

module.exports = ContactRequest
