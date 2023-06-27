 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Usuario from 'App/Models/Usuario'

export default class AuthController {
    async register({request, auth, response}: HttpContextContract) {
    
        let user = await Usuario.create(request.all())

        //generate token for user;
        let token = await auth.use("api").generate(user)
    
        Object.assign(user, token)
    
        return response.json(user)
      }
      async login({request, auth, response}) {
    
        let {email, senha} = request.all();
    
        try {
          if (await auth.attempt(email, senha)) {
            let user = await Usuario.findBy('email', email)
            let token = await auth.generate(user)
    
            //Object.assign(user, token)
            return response.json(user)
          }
    
    
        }
        catch (e) {
          console.log(e)
          return response.json({message: 'You are not registered!'})
        }
      }
      
      
    }

