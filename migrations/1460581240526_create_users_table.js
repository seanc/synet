'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {

  up () {
    this.create('users', function (table) {
      table.increments('id')
      table.timestamps()
      table.timestamp('deleted_at')
      table.string('username')
      table.string('password')
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UserSchema
