import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class TokenUsuarioValidatorStore {
    constructor (protected ctx: HttpContextContract) {}
    public schema= schema.create({
        id_usuario: schema.string(),
        token_dispositivo: schema.string(),
    })

    public messages = {
        'required': 'Digite um {{field}}',
        'string': 'O campo {{field}} deve ser uma string',
    }
}

export class TokenUsuarioValidatorUpdate {
    constructor(protected ctx: HttpContextContract) {}

    public schema= schema.create({
        id_usuario: schema.string(),
        token_dispositivo: schema.string(),
    })

    public messages = {
        'string': 'O campo {{field}} deve ser uma string',
      }

}