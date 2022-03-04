import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExameMarcadoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    data_hora: schema.date({
      format: 'dd/MM/yyyy HH:mm:ss'
    }),
    descricao: schema.string.optional({ trim: true }),
    esta_atrasado: schema.boolean(),
    esta_disponivel: schema.boolean(),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
    boolean: 'O campo {{field}} deve ser uma boleano',
    date: 'A data_hora deve ser do formato dd/MM/yyyy HH:mm:ss',
  }
}
