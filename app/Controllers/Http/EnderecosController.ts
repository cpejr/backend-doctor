import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Endereco from 'App/Models/Endereco'
import EnderecosRepository from 'App/Repositories/EnderecosRepository'
import EnderecosDTO from 'App/DTO/EnderecosDTO'

export default class EnderecosController {
  public async index({ request }: HttpContextContract) {
    const enderecoData = {
      id: request.param('id'),
      cep: request.param('cep'),
    } as EnderecosDTO
    const enderecos = await EnderecosRepository.find(enderecoData)
    return enderecos
  }

  public async store({ request }: HttpContextContract) {
    const cep = request.input('cep')
    const pais = request.input('pais')
    const estado = request.input('estado')
    const cidade = request.input('cidade')
    const bairro = request.input('bairro')
    const rua = request.input('rua')
    const numero = request.input('numero')
    const complemento = request.input('complemento')

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

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
