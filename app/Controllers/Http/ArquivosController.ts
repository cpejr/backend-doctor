import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Arquivo from 'App/Models/Arquivo'
import Drive from '@ioc:Adonis/Core/Drive'
import { v4 as uuid } from 'uuid'
import { Response } from 'aws-sdk'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ArquivosController {
  public async indexByChave({ request, response }: HttpContextContract) {
    try {
      const chave = request.param('chave')
      const arquivo = await Arquivo.findByOrFail('chave', chave)
      const urlRes = await Drive.get(arquivo.chave)
      return urlRes
    } catch (error) {
      return 'Falha ao pegar o arquivo!'
    }
  }

  public async store({ request }: HttpContextContract) {
    const image = request.input('file')

    const tipo_conteudo = "text"
    const ACL = 'public-read'
    const nome = "minionss"
    const chave = `${(Math.random() * 100).toString()}-${nome}`


    await Drive.put(chave, image, {
      contentType: tipo_conteudo,
      visibility: ACL,
    })


        await Arquivo.create({
          nome,
          chave,
          tipo_conteudo,
        })


    return chave;
  }

  public async update({}: HttpContextContract) {}

  public async destroy({ request }: HttpContextContract) {
    try {
      const chave = request.param('chave')
      const arquivo = await Arquivo.findByOrFail('chave', chave)

      await Drive.delete(arquivo.chave)
      await arquivo.delete()

      return 'Arquivo deletado com sucesso!'
    } catch (error) {
      return 'Falha ao apagar o arquivo!'
    }
  }
}

module.exports(ArquivosController)
