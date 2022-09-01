import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import UsuariosDTO from 'App/DTO/UsuariosDTO'
import UsuariosRepository from 'App/Repositories/UsuariosRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { UsuarioValidatorStore, UsuarioValidatorUpdate } from 'App/Validators/UsuarioValidator'
import Mail from '@ioc:Adonis/Addons/Mail'

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
      nome_cuidador: request.param('nome_cuidador'),
      telefone_cuidador: request.param('telefone_cuidador'),
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

  public async indexById({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return
		//o preload carrega todos as informacoes dos exames marcados daquele exame
    const usuario = await Usuario.query().where('id', id).preload("receita")
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
    const data_nascimento = new Date(validateData.data_nascimento.toISODate());
    const convenio = validateData.convenio
    const nome_cuidador = validateData.nome_cuidador
    const telefone_cuidador = validateData.telefone_cuidador
    const tipo = validateData.tipo
    const aprovado = validateData.aprovado
    const avatar_url = validateData.avatar_url
    const codigo = validateData.codigo
    const id_endereco = request.input('id_endereco')
    const id_consultorio = request.input('id_consultorio')

    data_nascimento.setHours(data_nascimento.getHours() + 3); // ajusta a data para o horário de Brasília


    const usuario = await Usuario.create({
      nome,
      email,
      senha,
      cpf,
      token_usuario,
      telefone,
      data_nascimento,
      convenio,
      nome_cuidador,
      telefone_cuidador,
      aprovado,
      avatar_url,
      tipo,
      codigo,
      id_consultorio,
      id_endereco,
    })
    return usuario
  }

  // public async AlteracaoDeSenha ({ request }: HttpContextContract) {
  //   const email = request.param('email')
  //   const novoToken = await auth.use('api').generate(usuario, {
  //     expiresIn: '120mins',
  //   })
  //   const token = novoToken.token
  //   const usuario = await Usuario.findBy('email', email)
  //   const urlExclusiva = `https://http://localhost:3000/alterarsenha?token=${token}`;
  //   await Mail.send((message) => {
  //     message
  //       .from('thoshioonuki2022@gmail.com')
  //       .to( usuario.email )
  //       .subject('Alteração de senha do DoctorApp')
  //       .htmlView('emails/alterar_senha', {
  //         user: { fullName: usuario.nome },
  //         url: urlExclusiva,
  //       })
  //   })
  // }
  

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
