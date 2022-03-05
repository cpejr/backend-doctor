import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class MensagemValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    mensagem: schema.string({ trim: true }),
    data_envio: schema.date({
      format: 'dd/MM/yyyy HH:mm:ss',
    }),
    media_url: schema.string({ trim: true }),
    foi_enviado: schema.boolean(),
    foi_visualizado: schema.boolean(),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
    boolean: 'O campo {{field}} deve ser uma boleano',
    date: 'A data_envio deve ser do formato dd/MM/yyyy HH:mm:ss',
  }
}
export class MensagemValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    mensagem: schema.string.optional({ trim: true }),
    data_envio: schema.date.optional({
      format: 'dd/MM/yyyy HH:mm:ss',
    }),
    media_url: schema.string.optional({ trim: true }),
    foi_enviado: schema.boolean.optional(),
    foi_visualizado: schema.boolean.optional(),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
    boolean: 'O campo {{field}} deve ser uma boleano',
    date: 'A data_envio deve ser do formato dd/MM/yyyy HH:mm:ss',
  }
}
