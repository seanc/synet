'use strict'

const Schema = use('Schema')

class ContactRequestSchema extends Schema {

  up () {
    this.create('contact_requests', function (table) {
      table.increments('id')
      table.timestamps()
      table.timestamp('deleted_at')
      table.string('name')
      table.string('email')
      table.string('subject')
      table.text('message', 'longtext')
      table.boolean('read')
    })
  }

  down () {
    this.drop('contact_requests')
  }

}

module.exports = ContactRequestSchema
