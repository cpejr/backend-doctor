import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EnderecosRepository from 'App/Repositories/EnderecosRepository'
import EnderecosDTO from 'App/DTO/EnderecosDTO'
import Endereco from 'App/Models/Endereco'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { EnderecoValidatorStore, EnderecoValidatorUpdate } from 'App/Validators/EnderecoValidator'


export default class EnderecosController {
  public async index({ request }: HttpContextContract) {
    const enderecoData = {
      id: request.param('id'),
      cep: request.param('cep'),
      pais: request.param('pais'),
      estado: request.param('estado'),
      cidade: request.param('cidade'),
      bairro: request.param('bairro'),
      rua: request.param('rua'),
      numero: request.param('numero'),
      complemento: request.param('complemento'),
    } as EnderecosDTO
    const enderecos = await EnderecosRepository.find(limpaCamposNulosDeObjeto(enderecoData))
    return enderecos
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(EnderecoValidatorStore)

    const cep = validateData.cep
    const pais = validateData.pais
    const estado = validateData.estado
    const cidade = validateData.cidade
    const bairro = validateData.bairro
    const rua = validateData.rua
    const numero = validateData.numero
    const complemento = validateData.complemento

    const endereco = await Endereco.create({
      cep,
      pais,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      complemento,
    })
    return endereco
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validateData = await request.validate(EnderecoValidatorUpdate)

    const endereco = await Endereco.findOrFail(id)
    endereco.merge(limpaCamposNulosDeObjeto(validateData))
    await endereco.save()

    return endereco
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const endereco = await Endereco.findOrFail(id)
    await endereco.delete()

    return endereco
  }
}
