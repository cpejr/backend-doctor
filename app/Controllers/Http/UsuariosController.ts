import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import UsuariosDTO from 'App/DTO/UsuariosDTO'
import UsuariosRepository from 'App/Repositories/UsuariosRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

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
    const nome = request.input('nome')
    const email = request.input('email')
    const telefone = request.input('telefone')
    const data_nascimento = request.input('data_nascimento')
    const convenio = request.input('convenio')
    const tipo = request.input('tipo')
    const aprovado = request.input('aprovado')
    const avatar_url = request.input('avatar_url')
    const codigo = request.input('codigo')
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
      id_endereco
    })
    return usuario
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const usuarioData = {
      id,
      nome: request.input('nome'),
      email: request.input('email'),
      telefone: request.input('telefone'),
      data_nascimento: request.input('data_nascimento'),
      convenio: request.input('convenio'),
      tipo: request.input('tipo'),
      aprovado: request.input('aprovado'),
      avatar_url: request.input('avatar_url'),
      codigo: request.input('codigo'),
      id_endereco: request.input('id_endereco'),
      id_consultorio: request.input('id_consultorio'),
    } as UsuariosDTO

    const usuario = await Usuario.findOrFail(id)
    usuario.merge(limpaCamposNulosDeObjeto(usuarioData))
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
