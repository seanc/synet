'use strict'

const Ansi = use("Ansi")
const Hash = use('Hash')

class CreateUser {
  
  static get inject () {
    return ['App/Model/User']
  }
  
  constructor (User) {
    this.user = User
  }

  static get description () {
    return 'Create a new user by passing user profile info'
  }

  static get signature () {
    return '{username} {password}'
  }

  * handle (options, flags) {
    const password = yield Hash.make(options.password)
    
    this.user.username = options.username
    this.user.password = password
    
    yield this.user.create()
    Ansi.success('Created user')
  }

}

module.exports = CreateUser
