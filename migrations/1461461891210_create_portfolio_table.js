'use strict'

const Schema = use('Schema')

class PortfolioSchema extends Schema {

  up () {
    this.create('portfolio_items', function (table) {
      table.increments('id')
      table.timestamps()
      table.timestamp('deleted_at')
      table.string('name')
      table.string('preview')
      table.string('link')
    })
  }

  down () {
    this.drop('portfolio_items')
  }

}

module.exports = PortfolioSchema
