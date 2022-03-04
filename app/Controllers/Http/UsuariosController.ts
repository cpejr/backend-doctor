import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import UsuariosDTO from 'App/DTO/UsuariosDTO'
import UsuariosRepository from 'App/Repositories/UsuariosRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import UsuarioValidator from 'App/Validators/UsuarioValidator'

export default class UsuariosController {
  public async index({ request }: HttpContextContract) {
    const usuarioData = {
      id: request.param('id'),
      nome: request.param('nome'),
      email: request.param('email'),
      telefone: request.param('telefone'),
      data_nascimento: request.param('data_nascimento'),
      convenio: request.param('convenio'),
      tipo: request.param('tipo'),
      aprovado: request.param('aprovado'),
      avatar_url: request.param('avatar_url'),
      codigo: request.param('codigo'),
      id_endereco: request.param('id_endereco'),
      id_consultorio: request.param('id_consultorio'),
    } as UsuariosDTO
    const usuarios = await UsuariosRepository.find(limpaCamposNulosDeObjeto(usuarioData))
    return usuarios
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(UsuarioValidator)

    const nome = validateData.nome
    const email = validateData.email
    const telefone = validateData.telefone
    const data_nascimento = new Date(validateData.data_nascimento.toISODate())
    const convenio = validateData.convenio
    const tipo = validateData.tipo
    const aprovado = validateData.aprovado
    const avatar_url = validateData.avatar_url
    const codigo = validateData.codigo
    const id_endereco = request.input('id_endereco')
    const id_consultorio = request.input('id_consultorio')

    const usuario = await Usuario.create({
      nome,
      email,
      telefone,
      data_nascimento,
      convenio,
      tipo,
      aprovado,
      avatar_url,
      codigo,
      id_consultorio,
      id_endereco,
    })
    return usuario
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validatorSchema = schema.create({
      nome: schema.string.optional({ trim: true }),
      email: schema.string.optional({ trim: true }, [rules.email()]),
      telefone: schema.string.optional({ trim: true }, [rules.minLength(11), rules.maxLength(11)]),
      data_nascimento: schema.date.optional(),
      convenio: schema.string.optional({ trim: true }),
      tipo: schema.enum.optional(['MASTER', 'SECRETARIA', 'PACIENTE']),
      aprovado: schema.boolean.optional(),
      avatar_url: schema.string.optional({ trim: true }),
      codigo: schema.string.optional({ trim: true }),
    })

    const validateData = await request.validate({
      schema: validatorSchema,
      messages: {
        required: 'Digite um {{field}}',
        minLength: 'Insira {{options.minLength}} digitos em {{field}}',
        maxLength: 'Insira {{options.maxLength}} digitos em {{field}}',
        string: 'O campo {{field}} deve ser uma string',
        boolean: 'O campo {{field}} deve ser um boleano',
        enum: 'O campo {{field}} deve ser MASTER, SECRETARIA ou PACIENTE',
        email: 'Insira um email valido'
      },
    })

    const usuario = await Usuario.findOrFail(id)
    usuario.merge(limpaCamposNulosDeObjeto(validateData))
    await usuario.save()

    return usuario
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const usuario = await Usuario.findOrFail(id)
    await usuario.delete()

    return usuario
  }
}
