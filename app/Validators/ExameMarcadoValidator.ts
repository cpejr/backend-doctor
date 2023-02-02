import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ExameMarcadoValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    data_hora: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss',
    }),
    descricao: schema.string.optional({ trim: true }),
    data_envio: schema.date.optional({
      format: 'yyyy-MM-dd HH:mm:ss',
    }),
    data_devolucao: schema.date.optional({
      format: 'yyyy-MM-dd HH:mm:ss',
    }),
    data_pagamento: schema.date.optional({
      format: 'yyyy-MM-dd HH:mm:ss',
    }),
    esta_atrasado: schema.boolean.optional(),
    esta_disponivel: schema.boolean.optional(),
  })

  public messages = {
    'required': 'Digite um {{field}}',
    'string': 'O campo {{field}} deve ser uma string',
    'boolean': 'O campo {{field}} deve ser uma boleano',
    'date.format': 'A {{field}} deve ser do formato dd/MM/yyyy HH:mm:ss',
  }
}
export class ExameMarcadoValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    data_hora: schema.date.optional({
      format: 'dd/MM/yyyy HH:mm:ss',
    }),
    descricao: schema.string.optional({ trim: true }),
    data_envio: schema.date.optional({
      format: 'dd/MM/yyyy HH:mm:ss',
    }),
    data_devolucao: schema.date.optional({
      format: 'dd/MM/yyyy HH:mm:ss',
    }),
    data_pagamento: schema.date.optional({
      format: 'dd/MM/yyyy HH:mm:ss',
    }),
    esta_atrasado: schema.boolean.optional(),
    esta_disponivel: schema.boolean.optional(),
  })

  public messages = {
    'string': 'O campo {{field}} deve ser uma string',
    'boolean': 'O campo {{field}} deve ser uma boleano',
    'date.format': 'A {{field}} deve ser do formato dd/MM/yyyy HH:mm:ss',
  }
}
