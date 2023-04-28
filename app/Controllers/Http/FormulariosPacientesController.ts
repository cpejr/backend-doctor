import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Usuario from 'App/Models/Usuario'
import Mail from '@ioc:Adonis/Addons/Mail'
import { mensagemComunicado, mensagemFormularioUrgencia,sendMessage } from 'Config/whatsApp'
import FormularioPaciente from 'App/Models/FormularioPaciente'
import FormulariosPacientesDTO from 'App/DTO/FormulariosPacientesDTO'
import FormulariosPacientesRepository from 'App/Repositories/FormulariosPacientesRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import {
  FormularioPacienteValidatorStore,
  FormularioPacienteValidatorUpdate,
} from 'App/Validators/FormularioPacienteValidator'

export default class FormulariosPacientesController {
  public async index({ request }: HttpContextContract) {
    const formularioPacienteData = {
      id: request.param('id'),
      respostas: request.param('respostas'),
      midia_url: request.param('midia_url'),
      word: request.param('word'),
      status: request.param('status'),
      notificacao_ativa: request.param('notificacao_ativa'),
      id_usuario: request.param('id_usuario'),
      id_formulario: request.param('id_formulario'),
    } as FormulariosPacientesDTO
    const formulariosPacientes = await FormulariosPacientesRepository.find(
      limpaCamposNulosDeObjeto(formularioPacienteData)
    )
    return formulariosPacientes
  }

  public async indexById({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return
    const formularioEspecifico = await FormularioPaciente.findBy('id', id)

    return formularioEspecifico
  }
  public async indexByIdUsuario({ request }: HttpContextContract) {
    const formularioData = {
      id_usuario: request.param('id_usuario'),
    } as FormulariosPacientesDTO

    const formularioEspecifico = await FormulariosPacientesRepository.find(formularioData)
    return formularioEspecifico
  }
  public async indexByIdFormulario({ request }: HttpContextContract) {
    const formularioData = {
      id_formulario: request.param('id_formulario'),
    } as FormulariosPacientesDTO

    const formularioEspecifico = await FormulariosPacientesRepository.find(formularioData)
    return formularioEspecifico
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(FormularioPacienteValidatorStore)

    const respostas = request.input('respostas')
    const midia_url = validateData.midia_url
    const word = validateData.word
    const status = validateData.status
    const notificacao_ativa = validateData.notificacao_ativa
    const id_usuario = request.input('id_usuario')
    const id_formulario = request.input('id_formulario')

    const formularioPaciente = await FormularioPaciente.create({
      respostas,
      midia_url,
      word,
      status,
      notificacao_ativa,
      id_usuario,
      id_formulario,
    })
    return formularioPaciente
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validateData = await request.validate(FormularioPacienteValidatorUpdate)
    const { status, notificacao_ativa } = validateData

    const formularioPaciente = await FormularioPaciente.findOrFail(id)
    if (status || notificacao_ativa) {
      const usuario = await Usuario.findOrFail(formularioPaciente.id_usuario)
      const mensagemFormulario = await sendMessage()
      const emailAdm = Mail.send((message) => {
        message
          .from(Env.get('SENDER_EMAIL'))
          .to(Env.get('SENDER_EMAIL'))
          .subject('Formulário de Urgência respondido')
          .htmlView('emails/formulario_urgencia_respondido', {
            nome_paciente: usuario.nome,
            url: Env.get('SYSTEM_URL'),
          })
      })

      try{
        console.log("Chegou")
        console.log(mensagemFormulario)
      await Promise.all([mensagemFormulario, emailAdm])}
      catch{}
    }


    formularioPaciente.merge(limpaCamposNulosDeObjeto(validateData))
    await formularioPaciente.save()

    return formularioPaciente
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const formularioPaciente = await FormularioPaciente.findOrFail(id)
    await formularioPaciente.delete()

    return formularioPaciente
  }
}
