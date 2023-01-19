import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TokenUsuariosRepository from 'App/Repositories/TokenUsuariosRepository'
import TokenUsuariosDTO from 'App/DTO/TokenUsuariosDTO'
import TokenUsuarios from 'App/Models/TokenUsuarios'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { TokenUsuarioValidatorStore, TokenUsuarioValidatorUpdate } from 'App/Validators/TokenUsuarioValidator'

export default class TokenUsuariosController {
  public async index({ request }: HttpContextContract) {
    const tokenusuarios = {
      id_usuario: request.param('id_usuario'),
      token_dispositivo: request.param('token_dispositivo'),
      
    } as TokenUsuariosDTO
    const  token = await TokenUsuariosRepository.find(
      limpaCamposNulosDeObjeto(tokenusuarios)
    )
    return token
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(TokenUsuarioValidatorStore)

    const id_usuario = validateData.id_usuario
    const token_dispositivo = validateData.token_dispositivo
  

    const token = await TokenUsuarios.create({
      id_usuario,
      token_dispositivo,
    })
    return token
  }

  public async update({ request }: HttpContextContract) {
    const id_usuario = request.param('id_usuario')
    if (!id_usuario) return

    const validateData = await request.validate(TokenUsuarioValidatorUpdate)

    const TokenUsuario = await TokenUsuarios.findOrFail(id_usuario)
    TokenUsuario.merge(limpaCamposNulosDeObjeto(validateData))
    await TokenUsuario.save()

    return TokenUsuarios
  }
}