import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UsuarioValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [rules.email()]),
    telefone: schema.string({ trim: true }, [rules.minLength(11), rules.maxLength(11)]),
    data_nascimento: schema.date({ format: 'dd/MM/yyyy' }),
    convenio: schema.string.optional({ trim: true }),
    tipo: schema.enum(['MASTER', 'SECRETARIA', 'PACIENTE']),
    aprovado: schema.boolean.optional(),
    avatar_url: schema.string.optional({ trim: true }),
    codigo: schema.string.optional({ trim: true }),
  })

  public messages = {
    'required': 'Digite um {{field}}',
    'minLength': 'Insira {{options.minLength}} digitos em {{field}}',
    'maxLength': 'Insira {{options.maxLength}} digitos em {{field}}',
    'string': 'O campo {{field}} deve ser uma string',
    'boolean': 'O campo {{field}} deve ser um boleano',
    'enum': 'O campo {{field}} deve ser MASTER, SECRETARIA ou PACIENTE',
    'email': 'Insira um email valido',
    'date.format': 'Insira uma data no formato dd/MM/yyyy',
  }
}
export class UsuarioValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string.optional({ trim: true }),
    email: schema.string.optional({ trim: true }, [rules.email()]),
    telefone: schema.string.optional({ trim: true }, [rules.minLength(11), rules.maxLength(11)]),
    data_nascimento: schema.date.optional({ format: 'dd/MM/yyyy' }),
    convenio: schema.string.optional({ trim: true }),
    tipo: schema.enum.optional(['MASTER', 'SECRETARIA', 'PACIENTE']),
    aprovado: schema.boolean.optional(),
    avatar_url: schema.string.optional({ trim: true }),
    codigo: schema.string.optional({ trim: true }),
  })

  public messages = {
    'minLength': 'Insira {{options.minLength}} digitos em {{field}}',
    'maxLength': 'Insira {{options.maxLength}} digitos em {{field}}',
    'string': 'O campo {{field}} deve ser uma string',
    'boolean': 'O campo {{field}} deve ser um boleano',
    'enum': 'O campo {{field}} deve ser MASTER, SECRETARIA ou PACIENTE',
    'email': 'Insira um email valido',
    'date.format': 'Insira uma data no formato dd/MM/yyyy',
  }
}
