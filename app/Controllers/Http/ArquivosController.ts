import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Arquivo from 'App/Models/Arquivo'
import Drive from '@ioc:Adonis/Core/Drive'
import { v4 as uuid } from 'uuid'
import { Response } from 'aws-sdk'
import { schema } from '@ioc:Adonis/Core/Validator'

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
    const image = request.input('file')
    console.log(image)
    const tipo_conteudo = "image/jpeg"
    const ACL = 'public-read'
    const nome = "abobrinha"
    const chave = `${(Math.random() * 100).toString()}-${nome}`


    await Drive.put(chave, image, {
      contentType: tipo_conteudo,
      visibility: ACL,
    })

    // request.multipart
    //   .onFile('imagem', {}, async (file) => {
    //     const tipo_conteudo = file.headers['content-type']
    //     const ACL = 'public-read'
    //     const nome = file.filename.toString()
    //     const chave = `${(Math.random() * 100).toString()}-${file.filename.toString()}`

    //     console.log(file)

    //     await Drive.putStream(chave, file, {
    //       contentType: tipo_conteudo,
    //       visibility: ACL,
    //     })

    //     await Arquivo.create({
    //       nome,
    //       chave,
    //       url,
    //       tipo_conteudo,
    //     })
    //   })
    //   .process()

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
