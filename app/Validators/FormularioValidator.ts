import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FormularioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string({
      trim: true,
    }),
    tipo: schema.string({
      trim: true,
    }),
    finalidade: schema.string({
      trim: true,
    }),
    // perguntas: schema.object().members({
      
    // }),
    urgencia: schema.number([
      rules.range(1, 3)]),
  })

  public messages = {
    required: 'Digite um {{field}}',
    'urgencia.range': 'Insira estrelas de 1 a 3',
    string: 'O campo {{field}} deve ser uma string',
    number: 'O campo {{field}} deve ser um inteiro',
    enum: '{{ field }} deve ser {{ options.choices }}'
  }
}
