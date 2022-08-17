import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Arquivo from 'App/Models/Arquivo'
import Drive from '@ioc:Adonis/Core/Drive'

export default class ArquivosController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    request.multipart
      .onFile('imagem', {}, async (file) => {
        try {
          const tipo_conteudo = file.headers['content-type']
          const ACL = 'public-read'
          const nome = JSON.stringify(file.filename)
          const chave = `${(Math.random() * 100).toString()}${nome}`
          const s3file = JSON.stringify(file)
          console.log(
            '🚀 ~ file: ArquivosController.ts ~ line 18 ~ ArquivosController ~ .onFile ~ s3file',
            s3file
          )

          // const url = await Drive.put(chave, s3file, {
          //   tipo_conteudo,
          //   ACL,
          // })
          await Drive.put(chave, s3file, {
            tipo_conteudo,
            ACL,
          })
            .then((res) => console.log('succes', res))
            .catch((error) => console.log('fail', error))

          // await Arquivo.create({
          //   nome,
          //   chave,
          //   url,
          //   tipo_conteudo,
          // })
        } catch (error) {
          return response.status(error.status).send({
            message: 'Não foi possível enviar o arquivo!',
            error_message: error.message,
          })
        }
      })
      .process()
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
