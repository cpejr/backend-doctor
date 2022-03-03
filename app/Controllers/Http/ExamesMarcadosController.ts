import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExamesMarcadosDTO from 'App/DTO/ExamesMarcadosDTO'
import ExameMarcado from 'App/Models/ExameMarcado'
import ExamesMarcadosRepository from 'App/Repositories/ExamesMarcadosRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

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
    const examesMarcados = await ExamesMarcadosRepository.find(limpaCamposNulosDeObjeto(exameMarcadoData))
    return examesMarcados
  }

  public async store({ request }: HttpContextContract) {
    const data_hora = request.input('data_hora')
    const descricao = request.input('descricao')
    const data_envio = request.input('data_envio')
    const data_devolucao = request.input('data_devolucao')
    const data_pagamento = request.input('data_pagamento')
    const esta_atrasado = request.input('esta_atrasado')
    const esta_disponivel = request.input('esta_disponivel')
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
      id_dispositivo
    })
    return exameMarcado
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const exameMarcadoData = {
      id,
      data_hora: request.input('data_hora'),
      descricao: request.input('descricao'),
      data_envio: request.input('data_envio'),
      data_devolucao: request.input('data_devolucao'),
      data_pagamento: request.input('data_pagamento'),
      esta_atrasado: request.input('esta_atrasado'),
      esta_disponivel: request.input('esta_disponivel'),
      id_usuario: request.input('id_usuario'),
      id_exame: request.input('id_exame'),
      id_consultorio: request.input('id_consultorio'),
      id_dispositivo: request.input('id_dispositivo'),
    } as ExamesMarcadosDTO

    const exameMarcado = await ExameMarcado.findOrFail(id)
    exameMarcado.merge(limpaCamposNulosDeObjeto(exameMarcadoData))
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
