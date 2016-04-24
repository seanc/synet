'use strict'

const Hash = use('Hash')
const Validator = use('Validator')
const ValidatorMessages = {
    'password.required': 'Missing password field',
    'username.required': 'Missing username field'
}

class AuthController {

    * login (request, response) {
        const User = use('App/Model/User')        
        const rules = {
            'username': 'required',
            'password': 'required'
        }
        let data = request.all()
        let validation = yield Validator.validate(rules, data, ValidatorMessages)
        if (validation.fails()) {
            return yield response.sendView('login', {
               errors: validation.messages()
            })
        }

        let userUsername = request.input('username')
        let userPassword = request.input('password')
        let userPasswordHashed = yield Hash.make(userPassword)
        let storedUser = yield User.where('username', '=', userUsername)
        try {
            const check = yield Hash.verify(userPassword, storedUser[0].password)
            if (check) {
                response.cookie('user', {
                  loggedIn: true,
                  username: storedUser[0].username
                })
                response.route('/admin');
            }
        } catch (e) {
            console.log(e)
            yield response.sendView('login', {
                errors: [
                    {
                        message: 'Incorrect username or password'
                    }
                ]
            })
        }
    }

    * logout (request, response) {
        response.cookie('user', null)
        response.redirect('/admin/login')
    }
}

module.exports = AuthController
