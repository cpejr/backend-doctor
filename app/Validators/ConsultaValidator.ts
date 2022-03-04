import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConsultaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    data_hora: schema.date({
      format: 'dd/MM/yyyy HH:mm:ss'
    }),
    duracao_em_minutos: schema.number([
      rules.unsigned()]),
    descricao: schema.string.optional({ trim: true }),
    avaliacao: schema.number([rules.range(1, 3),]),
  })

  public messages = {
    required: 'Digite um {{field}}',
    'avaliacao.range': 'Insira valores entre 1 e 3 em avaliacao',
    string: 'O campo {{field}} deve ser uma string',
    number: 'O campo {{field}} deve ser um inteiro',
    'date.format': 'A data_hora deve ser do formato dd/MM/yyyy HH:mm:ss',
    unsigned: 'A duracao_em_minutos deve ser um numero positivo'
  }
}
