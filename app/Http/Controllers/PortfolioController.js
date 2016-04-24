'use strict'

const Portfolio = use('App/Model/Portfolio')
const Validator = use('Validator')
const ValidatorMessages = {
    'name.required': 'Missing name field',
    'preview.required': 'Missing preview field',
    'link.required': 'Missing link field'
}

class PortfolioController {
  
    * index (request, response) {
        const items = yield Portfolio.all()
        console.log(items.value())
        yield response.sendView('portfolio', {
            items: items.value(),
            user: request.cookie('user', {})
        })
    }
    * create (request, response) {
        const rules = {
            'name': 'required',
            'preview': 'required',
            'link': 'required'
        }
        const data = request.all();
        const validation = yield Validator.validate(rules, data, ValidatorMessages)
        if (validation.fails()) {
            return yield response.sendView('portfolio-create', {
                errors: validation.messages()
            })
        }
                
        yield Portfolio.create({
            name: data.name,
            preview: data.preview,
            link: data.link
        })
        
        yield response.sendView('portfolio-create', {
            success: true,
            user: request.cookie('user', {})
        })
    }
    * edit (request, response) {
        const item = parseInt(request.param('item'))
        const storedItem = yield Portfolio.find(item)
        
        yield response.sendView('portfolio-edit', {
            form: {
                id: storedItem.id,
                name: storedItem.name,
                preview: storedItem.preview,
                link: storedItem.link
            },
            user: request.cookie('user', {})
        })
    }
    * update (request, response) {
        const item = parseInt(request.input('item'))
        const storedItem = yield Portfolio.find(item)
        
        storedItem.name = request.input('name')
        storedItem.preview = request.input('preview')
        storedItem.link = request.input('link')
        
        yield storedItem.update()
        
        const items = yield Portfolio.all()
        
        yield response.sendView('portfolio', {
            user: request.cookie('user', {}),
            items: items.value(),
            success: {
                message: 'Portfolio item was successfully updated'
            }
        })
    }
    * destroy (request, response) {
        const item = parseInt(request.param('item'))
        const storedItem = yield Portfolio.find(item)
        yield storedItem.delete();
        const items = yield Portfolio.all()
        yield response.sendView('portfolio', {
            items: items.value(),
            success: {
                message: 'Portfolio item successfully deleted'
            },
            user: request.cookie('user', {})
        })
    }
}

module.exports = PortfolioController
