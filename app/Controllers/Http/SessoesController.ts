import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import Hash from '@ioc:Adonis/Core/Hash'

export default class SessoesController {
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const senha = request.input('senha')
    const usuario = await Usuario.query().where('email', email).firstOrFail()

    // Verify password
    if (!(await Hash.verify(usuario.senha, senha))) {
      return response.badRequest('Credenciais Inválidas')
    }

    // Generate token
    const novoToken = await auth.use('api').generate(usuario, {
      expiresIn: '30mins',
    })

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
