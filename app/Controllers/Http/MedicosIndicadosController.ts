import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MedicosIndicado from 'App/Models/MedicosIndicado'
import MedicosIndicadoDTO from 'App/DTO/MedicosIndicadosDTO'
import MedicosIndicadoRepository from 'App/Repositories/MedicosIndicadosRepository'
import { MedicosIndicadoValidatorStore,MedicosIndicadoValidatorUpdate } from 'App/Validators/MedicosIndicadoValidator'


export default class MedicosIndicadosController {

public async index({ request }: HttpContextContract) {
    const indicacaoMedico = {    
        id_indicacao: request.input('id_indicacao'),
        nome: request.input('nome'),
        telefone: request.input('password'),
        local_atendimento: request.input('local_atedimento'),
    } as MedicosIndicadoDTO

    const medicos_indicados = await MedicosIndicadoRepository.find(indicacaoMedico)

    return medicos_indicados
}

public async indexByIdIndicacao({ request }: HttpContextContract) {
    const consultaData = {
      id_indicacao: request.param('id_indicacao'),
    } as MedicosIndicadoDTO

    const consultas = MedicosIndicadoRepository.find(consultaData)

    return consultas
  }

public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(MedicosIndicadoValidatorStore)

    const id_indicacao = validateData.id_indicacao
    const nome =  validateData.nome
    const telefone = validateData.telefone
    const local_atendimento = validateData.local_atendimento


    const medicos_indicados = await MedicosIndicado.create({
        id_indicacao,
        nome,
        telefone,
        local_atendimento
    })

    return medicos_indicados
}

public async update({ params, request }) {

    const id = request.param('id')
    if (!id) return

    const validateData = await request.validate(MedicosIndicadoValidatorUpdate)
   
    const medicos_indicados = await MedicosIndicado.findOrFail(params.id)
    medicos_indicados.merge(validateData)
        
    await medicos_indicados.save()

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