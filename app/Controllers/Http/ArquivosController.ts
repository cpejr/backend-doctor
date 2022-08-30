import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Arquivo from 'App/Models/Arquivo'
import Drive from '@ioc:Adonis/Core/Drive'
import { v4 as uuid } from 'uuid'
import { Response } from 'aws-sdk'

export default class ArquivosController {
  public async indexByUrl({ request, response }: HttpContextContract) {
    try {
      const url = request.param('url')
      const arquivo = await Arquivo.findByOrFail('url', url)
      const urlRes = await Drive.getUrl(arquivo.chave)
      return urlRes
    } catch (error) {
      return 'Falha ao pegar o arquivo!'
    }
  }

  public async store({ request }: HttpContextContract) {
    const url = uuid()
    request.multipart
      .onFile('imagem', {}, async (file) => {
        const tipo_conteudo = file.headers['content-type']
        const ACL = 'public-read'
        const nome = file.filename.toString()
        const chave = `${(Math.random() * 100).toString()}-${file.filename.toString()}`
        const s3file = JSON.stringify(file)

        await Drive.put(chave, s3file, {
          contentType:tipo_conteudo,
          visibility: ACL,
        })

        await Arquivo.create({
          nome,
          chave,
          url,
          tipo_conteudo,
        })
      })
      .process()
    return url
  }

  public async update({}: HttpContextContract) {}

  public async destroy({ request }: HttpContextContract) {
    try {
      const url = request.param('url')
      const arquivo = await Arquivo.findByOrFail('url', url)

      await Drive.delete(arquivo.chave)
      await arquivo.delete()

      return 'Arquivo deletado com sucesso!'
    } catch (error) {
      return 'Falha ao apagar o arquivo!'
    }
  }
}
