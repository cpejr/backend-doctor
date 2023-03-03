import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class MedicosIndicadoValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_indicacao_especifica: schema.string({ trim: true }),
    nome: schema.string.optional({ trim: true }),
    telefone: schema.string.optional({ trim: true }),
    local_atendimento: schema.string({ trim: true }),
    

  })

  public messages = {
    'required': 'Digite um {{field}}',
    'avaliacao.range': 'Insira valores entre 1 e 3 em avaliacao',
    'string': 'O campo {{field}} deve ser uma string',
    'number': 'O campo {{field}} deve ser um inteiro',
    'date': 'A data_hora deve ser do formato yyyy-MM-dd HH:mm:ss',
    'unsigned': 'A duracao_em_minutos deve ser um numero positivo',
  }

}


export class MedicosIndicadoValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_indicacao_especifica: schema.string.optional({ trim: true }),
    nome: schema.string.optional({ trim: true }),
    telefone: schema.string.optional({ trim: true }),
    local_atendimento: schema.string.optional({ trim: true }),
    
  })

  public messages = {
    'required': 'Digite um {{field}}',
    'avaliacao.range': 'Insira valores entre 1 e 3 em avaliacao',
    'string': 'O campo {{field}} deve ser uma string',
    'number': 'O campo {{field}} deve ser um inteiro',
    'date': 'A data_hora deve ser do formato yyyy-MM-dd HH:mm:ss',
    'unsigned': 'A duracao_em_minutos deve ser um numero positivo',
  }

}


