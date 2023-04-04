import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MedicosIndicado from 'App/Models/MedicosIndicado'
import MedicosIndicadoDTO from 'App/DTO/MedicosIndicadosDTO'
import MedicosIndicadoRepository from 'App/Repositories/MedicosIndicadosRepository'
import {
  MedicosIndicadoValidatorStore,
  MedicosIndicadoValidatorUpdate,
} from 'App/Validators/MedicosIndicadoValidator'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

export default class MedicosIndicadosController {
  public async index({ request }: HttpContextContract) {
    const indicacaoMedico = {
      id_indicacao_especifica: request.param('id_indicacao_especifica'),
      nome: request.param('nome'),
      telefone: request.param('telefone'),
      local_atendimento: request.param('local_atedimento'),
    } as MedicosIndicadoDTO

    const medicos_indicados = await MedicosIndicadoRepository.find(
      limpaCamposNulosDeObjeto(indicacaoMedico)
    )

    return medicos_indicados
  }

  public async indexByIdIndicacao({ request }: HttpContextContract) {
    const medico_indicado = {
      id_indicacao_especifica: request.param('id_indicacao_especifica'),
    } as MedicosIndicadoDTO

    const medicos = MedicosIndicadoRepository.find(limpaCamposNulosDeObjeto(medico_indicado))
    return medicos
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(MedicosIndicadoValidatorStore)

    const id_indicacao_especifica = validateData.id_indicacao_especifica
    const nome = validateData.nome
    const telefone = validateData.telefone
    const local_atendimento = validateData.local_atendimento

    const medicos_indicados = await MedicosIndicado.create({
      id_indicacao_especifica,
      nome,
      telefone,
      local_atendimento,
    })

    return medicos_indicados
  }

  public async update({ params, request }) {
  
    const id = request.param('id')
    if (!id) return

    
    const validateData = await request.validate(MedicosIndicadoValidatorUpdate);

    const medicos_indicados = await MedicosIndicado.findOrFail(params.id);


    medicos_indicados.merge(limpaCamposNulosDeObjeto(validateData));

    await medicos_indicados.save();

    return medicos_indicados
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const medicos_indicados = await MedicosIndicado.findOrFail(id)
    await medicos_indicados.delete()

    return medicos_indicados
  }
}
