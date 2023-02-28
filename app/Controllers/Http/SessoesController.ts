import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import ApiToken from 'App/Models/ApiToken'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'
import jwt from 'jsonwebtoken'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import ApiTokenDTO from 'App/DTO/ApiTokenDTO'
import ApiTokenRepository from 'App/Repositories/ApiTokenRepository'
import ApiTokenValidatorStore, { ApiTokenValidatorUpdate } from 'App/Validators/ApiTokenValidator'
export default class SessoesController {
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const senha = request.input('senha')
    const usuario = await Usuario.query().where('email', email).firstOrFail()

    if (!(await Hash.verify(usuario.senha, senha))) {
      return response.badRequest('Credenciais Inválidas')
    }
    const hoje = new Date();
    const tempoExpiracaoToken = hoje;
    const horas = tempoExpiracaoToken.getHours();
    tempoExpiracaoToken.setHours(horas + 8);


   const novoToken = await auth.use('api').generate(usuario, {
      expires_at: tempoExpiracaoToken,
    })
     

    const tokens = await ApiToken.all();
    
    for(var i = 0; i < tokens.length; i ++){
      if(tokens[i].$attributes.expiresAt < hoje){
        await tokens[i].delete();
      }
    }

    tokens[0].token = novoToken.token
    const token = novoToken.token
    
    const tipo = usuario.tipo
    const id = usuario.id
    
  

    return response.status(200).json({ id, email, token, tipo })
  }
  public async verificarSenha({ request, response }: HttpContextContract) {
    const email = request.input('email')
    const senha = request.input('senha')
    const usuario = await Usuario.query().where('email', email).firstOrFail()

    if (!(await Hash.verify(usuario.senha, senha))) {
      return response.badRequest('Credenciais Inválidas')
    } else {
      return true
    }
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(ApiTokenValidatorStore)

    const token = validateData.token

    const tokenapi = await ApiToken.create({
      token,
    })
    return tokenapi
  }
  
  public async update({ params, request }){
    
    const id = request.param('id')
    if (!id) return


    const validateData =  await request.validate(ApiTokenValidatorUpdate)
     
    const apiId = await ApiToken.findOrFail(params.id)

    apiId.merge(limpaCamposNulosDeObjeto(validateData.token));
    await apiId.save();

    return apiId
  }


}
