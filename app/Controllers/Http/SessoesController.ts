import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'

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

    return response.status(200).json({ email, token, tipo })
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

  public async AlteracaoDeSenha ({ request, auth }: HttpContextContract) {
    const email = request.param('email')
    const usuario = await Usuario.findBy('email', email)
    const novoToken = await auth.use('api').generate(usuario, {
      expiresIn: '120mins',
    })
    const token = novoToken.token
    const seguranca = "fc43c2dd-cf6c-4807-825e-3c9e7ba41b19e19637d2-5a44-463c-bae5-6709e7e53448"
    const urlExclusiva = `http://localhost:3000/${seguranca}/alterarsenha?token=${token}`;
    
    await Mail.send((message) => {
      message
        .from('thoshioonuki2022@gmail.com')
        .to( usuario.email )
        .subject('Alteração de senha do DoctorApp')
        .htmlView('emails/alterar_senha', {
          user: { fullName: usuario.nome },
          url: urlExclusiva,
        })
    })
  }
}
