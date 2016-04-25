'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Routes helps you in defining http endpoints/urls which will be used
| by outside world to interact with your application. Adonis has a
| lean and rich router to support various options out of the box.
|
*/
const Route = use('Route')

Route.get('/', 'HomeController.index')
Route.post('/contact', 'HomeController.contact')

// Admin

Route.group('admin', function() {
  Route.get('/', 'DashboardController.index')
  
  Route.get('/portfolio', 'PortfolioController.index')  
  Route.get('/portfolio/create', function *(request, response) {
    yield response.sendView('portfolio-create', {
      user: request.cookie('user', {})
    })
  })
  Route.get('/portfolio/edit/:item', 'PortfolioController.edit')
  Route.get('/portfolio/delete/:item', 'PortfolioController.destroy')
  Route.post('/portfolio/create', 'PortfolioController.create')
  Route.post('/portfolio/update', 'PortfolioController.update')
  
  Route.get('/contact', 'ContactController.index')
  Route.get('/contact/view/:id', 'ContactController.show')
    
  Route.get('/logout', 'AuthController.logout')
}).prefix('/admin').middlewares(['auth'])

Route.get('/admin/login', 'DashboardController.login')
Route.post('/admin/login', 'AuthController.login')  