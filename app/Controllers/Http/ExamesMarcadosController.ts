import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExamesMarcadosDTO from 'App/DTO/ExamesMarcadosDTO'
import ExameMarcado from 'App/Models/ExameMarcado'
import ExamesMarcadosRepository from 'App/Repositories/ExamesMarcadosRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { ExameMarcadoValidatorStore, ExameMarcadoValidatorUpdate} from 'App/Validators/ExameMarcadoValidator'

export default class ExameMarcadosController {
  public async index({ request }: HttpContextContract) {
    const exameMarcadoData = {
      id: request.param('id'),
      data_hora: request.param('data_hora'),
      descricao: request.param('descricao'),
      data_envio: request.param('data_envio'),
      data_devolucao: request.param('data_devolucao'),
      data_pagamento: request.param('data_pagamento'),
      esta_atrasado: request.param('esta_atrasado'),
      esta_disponivel: request.param('esta_disponivel'),
      id_usuario: request.param('id_usuario'),
      id_exame: request.param('id_exame'),
      id_consultorio: request.param('id_consultorio'),
      id_dispositivo: request.param('id_dispositivo'),
    } as ExamesMarcadosDTO
    const examesMarcados = await ExamesMarcadosRepository.find(
      limpaCamposNulosDeObjeto(exameMarcadoData)
    )
    return examesMarcados
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(ExameMarcadoValidatorStore)

    const data_hora = validateData.data_hora
    const descricao = validateData.descricao
    const data_envio = validateData.data_envio
    const data_devolucao = validateData.data_devolucao
    const data_pagamento = validateData.data_pagamento
    const esta_atrasado = validateData.esta_atrasado
    const esta_disponivel = validateData.esta_disponivel
    const id_usuario = request.input('id_usuario')
    const id_exame = request.input('id_exame')
    const id_consultorio = request.input('id_uconsultorio')
    const id_dispositivo = request.input('id_dispositivo')

    const exameMarcado = await ExameMarcado.create({
      data_hora,
      descricao,
      data_envio,
      data_devolucao,
      data_pagamento,
      esta_atrasado,
      esta_disponivel,
      id_usuario,
      id_exame,
      id_consultorio,
      id_dispositivo,
    })
    return exameMarcado
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validateData = await request.validate(ExameMarcadoValidatorUpdate)

    const exameMarcado = await ExameMarcado.findOrFail(id)
    exameMarcado.merge(limpaCamposNulosDeObjeto(validateData))
    await exameMarcado.save()

    return exameMarcado
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const exameMarcado = await ExameMarcado.findOrFail(id)
    await exameMarcado.delete()

    return exameMarcado
  }
}
