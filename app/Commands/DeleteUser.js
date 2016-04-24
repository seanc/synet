'use strict'

const Ansi = use("Ansi")
const User = use('App/Model/User')

class CreateUser {
  
  static get inject () {
    return ['App/Model/User']
  }
  
  constructor (User) {
    this.user = User
  }

  static get description () {
    return 'Delete a user by passing username'
  }

  static get signature () {
    return '{username}'
  }

  * handle (options, flags) {
    const user = yield User.where('username', '=', options.username)
    const id = user[0].id
    const storedUser = yield User.find(id)
    yield storedUser.delete()
    
    Ansi.success(`Deleted user ${options.username}`)
  }

}

module.exports = CreateUser
