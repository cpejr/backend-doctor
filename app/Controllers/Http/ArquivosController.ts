import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Arquivo from 'App/Models/Arquivo'
import Drive from '@ioc:Adonis/Core/Drive'

export default class ArquivosController {
  public async index({ request }: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
   request.multipart
      .onFile('imagem', {}, async (file) => {
        const tipo_conteudo = file.headers['content-type']
        const ACL = 'public-read'
        const nome = JSON.stringify(file.filename)
        const chave = `${(Math.random() * 100).toString()}${nome}`
        const s3file = JSON.stringify(file)
        await Drive.put(chave, s3file, {
          tipo_conteudo,
          ACL,
        })

        await Arquivo.create({
          nome,
          chave,
          tipo_conteudo,
        })
      })
      .process()
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
