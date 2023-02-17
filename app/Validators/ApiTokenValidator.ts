import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export  class ApiTokenValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    
    token: schema.string({ trim: true }),
  })

  public messages = {
    'number': 'O campo {{field}} deve ser um inteiro',
    'string': 'O campo {{field}} deve ser uma string',
    }
}
export  class ApiTokenValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    
    token: schema.string({ trim: true }),
  })

  public messages = {
    'string': 'O campo {{field}} deve ser uma string',
    }
}
