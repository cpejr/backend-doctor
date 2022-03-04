import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EnderecoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cep: schema.string({ trim: true }, [
      rules.minLength(8),
      rules.maxLength(8),
    ]),
    pais: schema.string({ trim: true }),
    estado: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(2),
    ]),
    cidade: schema.string({ trim: true }),
    bairro: schema.string({ trim: true }),
    rua: schema.string({ trim: true }),
    numero: schema.number(),
    complemento: schema.string.optional({ trim: true }),
  })

  public messages = {
    required: 'Digite um {{field}}',
    minLength: 'Insira {{options.minLength}} digitos em {{field}}',
    maxLength: 'Insira {{options.maxLength}} digitos em {{field}}',
    string: 'O campo {{field}} deve ser uma string',
    number: 'O campo {{field}} deve ser um inteiro',
  }
}
