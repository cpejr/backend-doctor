import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConsultaValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    data_hora: schema.date({
      format: 'dd/MM/yyyy HH:mm:ss'
    }),
    duracao_em_minutos: schema.number([
      rules.unsigned()]),
    descricao: schema.string.optional({ trim: true }),
    avaliacao: schema.number([rules.range(1, 3),]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    required: 'Digite um {{field}}',
    'avaliacao.range': 'Insira valores entre 1 e 3 em avaliacao',
    string: 'O campo {{field}} deve ser uma string',
    number: 'O campo {{field}} deve ser um inteiro',
    'date.format': 'A data_hora deve ser do formato dd/MM/yyyy HH:mm:ss',
    unsigned: 'A duracao_em_minutos deve ser um numero positivo'
  }
}
