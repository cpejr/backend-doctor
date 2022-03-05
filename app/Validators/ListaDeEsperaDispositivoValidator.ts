import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ListaDeEsperaDispositivoValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    posicao: schema.number([
      rules.unique({
        table:'lista_de_espera_dispositivos',
        column:'posicao'
      })
    ]),
    esta_disponivel: schema.boolean(),
  })

  public messages = {
    required: 'Digite um {{field}}',
    number: 'O campo {{field}} deve ser um inteiro',
    boolean: 'O campo {{field}} deve ser uma boleano',
    'posicao.unique': 'O valor de {{field}} deve ser único'
  }
}
export class ListaDeEsperaDispositivoValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    posicao: schema.number.optional([
      rules.unique({
        table:'lista_de_espera_dispositivos',
        column:'posicao'
      })
    ]),
    esta_disponivel: schema.boolean.optional(),
  })

  public messages = {
    number: 'O campo {{field}} deve ser um inteiro',
    boolean: 'O campo {{field}} deve ser uma boleano',
    'posicao.unique': 'O valor de {{field}} deve ser único'
  }
}
