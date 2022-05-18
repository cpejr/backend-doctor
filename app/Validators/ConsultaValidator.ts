import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ConsultaValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    data_hora: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss'
    }),
    duracao_em_minutos: schema.number([
      rules.unsigned()]),
    descricao: schema.string.optional({ trim: true }),
    avaliacao: schema.number.optional([rules.range(1, 3),]),
  })

  public messages = {
    required: 'Digite um {{field}}',
    'avaliacao.range': 'Insira valores entre 1 e 3 em avaliacao',
    string: 'O campo {{field}} deve ser uma string',
    number: 'O campo {{field}} deve ser um inteiro',
    date: 'A data_hora deve ser do formato dd/MM/yyyy HH:mm:ss',
    unsigned: 'A duracao_em_minutos deve ser um numero positivo'
  }
}
export class ConsultaValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    data_hora: schema.date.optional({
      format: 'dd/MM/yyyy HH:mm:ss'
    }),
    duracao_em_minutos: schema.number.optional([rules.unsigned()]),
    descricao: schema.string.optional({ trim: true }),
    avaliacao: schema.number.optional([rules.range(0, 4)]),
  })

  public messages = {
    'avaliacao.range': 'Insira valores entre 1 e 3 em avaliacao',
    string: 'O campo {{field}} deve ser uma string',
    number: 'O campo {{field}} deve ser um inteiro',
    date: 'A data_hora deve ser do formato dd/MM/yyyy HH:mm:ss',
    unsigned: 'A duracao_em_minutos deve ser um numero positivo'
  }
}
