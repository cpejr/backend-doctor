import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import UsuariosDTO from 'App/DTO/UsuariosDTO'
import UsuariosRepository from 'App/Repositories/UsuariosRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { UsuarioValidatorStore, UsuarioValidatorUpdate } from 'App/Validators/UsuarioValidator'

export default class UsuariosController {
  public async index({ request }: HttpContextContract) {
    const usuarioData = {
      id: request.param('id'),
      nome: request.param('nome'),
      email: request.param('email'),
      cpf: request.param('cpf'),
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

  public async indexByEmail({ request }: HttpContextContract) {
    const email = request.param('email')
    if (!email) return
    const usuario = await Usuario.findBy('email', email)

    return usuario

  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(UsuarioValidatorStore)

    const nome = validateData.nome
    const email = validateData.email
    const senha = validateData.senha
    const cpf = validateData.cpf
    const token_usuario = validateData.token_usuario
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
      senha,
      cpf,
      token_usuario,
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

    const validateData = await request.validate(UsuarioValidatorUpdate)

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
