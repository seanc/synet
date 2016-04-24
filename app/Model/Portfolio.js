'use strict'

const Lucid = use("Lucid")

class Portfolio extends Lucid {

  static get table () {
    return 'portfolio_items'
  }
  
  static get softDeletes () {
    return false
  }
}

module.exports = Portfolio
