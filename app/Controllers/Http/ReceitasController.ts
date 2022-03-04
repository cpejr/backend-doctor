import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ReceitasDTO from 'App/DTO/ReceitasDTO'
import Receita from 'App/Models/Receita'
import ReceitasRepository from 'App/Repositories/ReceitasRepostory'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import ReceitaValidator from 'App/Validators/ReceitaValidator'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ReceitasController {
  public async index({ request }: HttpContextContract) {
    const receitaData = {
      id: request.param('id'),
      titulo: request.param('titulo'),
      descricao: request.param('descricao'),
      id_usuario: request.param('id_usuario'),
    } as ReceitasDTO
    const receitas = await ReceitasRepository.find(limpaCamposNulosDeObjeto(receitaData))
    return receitas
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(ReceitaValidator)

    const titulo = validateData.titulo
    const descricao = validateData.descricao
    const id_usuario = request.input('id_usuario')

    const receita = await Receita.create({
      titulo,
      descricao,
      id_usuario,
    })
    return receita
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validatorSchema = schema.create({
      titulo: schema.string.optional({
        trim: true,
      }),
      descricao: schema.string.optional({
        trim: true,
      }),
    })

    const validateData = await request.validate({
      schema: validatorSchema,
      messages: {
        required: 'Digite um(a) {{field}}',
        string: 'O campo {{field}} deve ser uma string',
      },
    })

    const receita = await Receita.findOrFail(id)
    receita.merge(limpaCamposNulosDeObjeto(validateData))
    await receita.save()

    return receita
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const receita = await Receita.findOrFail(id)
    await receita.delete()

    return receita
  }
}
