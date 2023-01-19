import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TokenUsuariosRepository from 'App/Repositories/TokenUsuariosRepository'
import TokenUsuariosDTO from 'App/DTO/TokenUsuariosDTO'
import TokenUsuarios from 'App/Models/TokenUsuarios'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
//import { DispositivoValidatorStore, DispositivoValidatorUpdate } from 'App/Validators/DispositivoValidator'

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
    //const validateData = await request.validate(DispositivoValidatorStore)

   // const token_dispositivo = validateData.token_dispositivo
  

    const token = await TokenUsuarios.create({
      
    })
    return token
  }