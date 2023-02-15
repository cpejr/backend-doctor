import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import ApiToken from 'App/Models/ApiToken'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'
import jwt from 'jsonwebtoken'
export default class SessoesController {
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const senha = request.input('senha')
    const usuario = await Usuario.query().where('email', email).firstOrFail()

    // Verify password
    if (!(await Hash.verify(usuario.senha, senha))) {
      return response.badRequest('Credenciais Inválidas')
    }
    const hoje = new Date();
    const tempoExpiracaoToken = hoje;
    const horas = tempoExpiracaoToken.getHours();
    tempoExpiracaoToken.setHours(horas + 8);

    
    // Generate token
    const novoToken = await auth.use('api').generate(usuario, {
      expires_at: tempoExpiracaoToken,
    })
     
     /*const novoToken =  jwt.sign( {usuario}, process.env.ACCESS_TOKEN_SECRET,{
      expiresIn: '5h',
    } )*/

    Object.assign(usuario, novoToken);
    
    const tokens = await ApiToken.all();
    
    for(var i = 0; i < tokens.length; i ++){
      if(tokens[i].$attributes.expiresAt < hoje){
        await tokens[i].delete();
      }
    }
    
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

}
