import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsuarioValidator {
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
    nome: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [
      rules.email()
    ]),
    telefone: schema.string({ trim: true }, [
      rules.minLength(11),
      rules.maxLength(11),
    ]),
    data_nascimento: schema.date(),
    convenio: schema.string({ trim: true }),
    tipo: schema.enum(['MASTER', 'SECRETARIA', 'PACIENTE']),
    aprovado: schema.boolean(),
    avatar_url: schema.string({ trim: true }),
    codigo: schema.string({ trim: true }),
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
    minLength: 'Insira {{options.minLength}} digitos em {{field}}',
    maxLength: 'Insira {{options.maxLength}} digitos em {{field}}',
    string: 'O campo {{field}} deve ser uma string',
    boolean: 'O campo {{field}} deve ser um boleano',
    enum: 'O campo {{field}} deve ser MASTER, SECRETARIA ou PACIENTE',
    Date: 'O campo {{field}} deve ser uma data',
  }
}
