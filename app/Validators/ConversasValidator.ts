import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ConversaValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_criador: schema.string({ trim: true }),
    id_receptor: schema.string({ trim: true }),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
    date: 'A data_envio deve ser do formato dd/MM/yyyy HH:mm:ss',
  }
}
export class ConversaValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_criador: schema.string({ trim: true }),
    id_receptor: schema.string({ trim: true }),
    ativada: schema.boolean(),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
    boolean: 'O campo {{field}} deve ser uma boleano',
    date: 'A data_envio deve ser do formato dd/MM/yyyy HH:mm:ss',
  }
}
