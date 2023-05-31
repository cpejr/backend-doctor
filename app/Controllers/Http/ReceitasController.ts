import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ReceitasDTO from 'App/DTO/ReceitasDTO'
import Receita from 'App/Models/Receita'
import ReceitasRepository from 'App/Repositories/ReceitasRepostory'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { ReceitaValidatorStore, ReceitaValidatorUpdate } from 'App/Validators/ReceitaValidator'
import ArquivosController from 'App/Controllers/Http/ArquivosController'
import Drive from '@ioc:Adonis/Core/Drive'

export default class ReceitasController {
  public async index({ request }: HttpContextContract) {
    const receitaData = {
      id: request.param('id'),
      titulo: request.param('titulo'),
      descricao: request.param('descricao'),
      pdf_url: request.param('pdf_url'),
      id_usuario: request.param('id_usuario'),
    } as ReceitasDTO
    const receitas = await ReceitasRepository.find(limpaCamposNulosDeObjeto(receitaData))
    return receitas
  }

  public async indexByIdUsuario({ request }: HttpContextContract) {
    const receitasData = {
      id_usuario: request.param('id_usuario'),
    } as ReceitasDTO

    const receitas = await ReceitasRepository.find(receitasData)

    return receitas
  }

  public async indexPdfLink({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const receitas = await Receita.findBy('id' , id)

    const url = await Drive.getSignedUrl(String(receitas?.pdf_url))

    return url
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(ReceitaValidatorStore)

    const arquivoscontroller: ArquivosController = new ArquivosController()

    const nomePaciente = request.input('nome')
    const dataNascimento = request.input('data')
    const formInicializar = request.input('formInicializar')
    const titulo = validateData.titulo
    const descricao = validateData.descricao

    const id_usuario = request.input('id_usuario')
    console.log(nomePaciente,dataNascimento, titulo, descricao )
    const res = await arquivoscontroller.criaPDFReceita(nomePaciente, dataNascimento, titulo, descricao)
    console.log(res);
    const receita = await Receita.create({
      titulo,
      descricao,
      id_usuario,
    })
    receita.$attributes.pdf_url = res
    console.log(receita.$attributes.pdf_url)
    await receita.save()

    return receita.$attributes.pdf_url
  }
  public async storeComArquivo({ request }: HttpContextContract) {
    const validateData = await request.validate(ReceitaValidatorStore)
    const arquivoscontroller: ArquivosController = new ArquivosController()
    const file = request.input('file')
    const url = await arquivoscontroller.storeFile(file)
    const titulo = validateData.titulo
    const descricao = validateData.descricao
    const id_usuario = request.input('id_usuario');
    const pdf_url = url

    const receita = await Receita.create({
      titulo,
      descricao,
      id_usuario,
      pdf_url,
    });

    await receita.save();

    return receita;
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validateData = await request.validate(ReceitaValidatorUpdate)

    const receita = await Receita.findOrFail(id)
    receita.merge(limpaCamposNulosDeObjeto(validateData))
    await receita.save()

    return receita
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const arquivoscontroller: ArquivosController = new ArquivosController()

    const receita = await Receita.findOrFail(id)

    await arquivoscontroller.destroy(receita.pdf_url)
    await receita.delete()

    return receita
  }
  
}
