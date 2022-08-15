import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Arquivo from 'App/Models/Arquivo'
import Drive from '@ioc:Adonis/Core/Drive'
import { AppStream, FileSystemCredentials, Request, S3 } from 'aws-sdk'
import Schema from '@ioc:Adonis/Lucid/Schema'
import { Application, Response } from '@adonisjs/core/build/standalone'

export default class ArquivosController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    console.log('entrou1')
    request.multipart.onFile('imagem', {}, async (file) => {
        console.log('entrou2')
        try {
          const tipo_conteudo = file.headers['content-type']
          const ACL = 'public-read'
          const nome = JSON.stringify(file.filename)
          const chave = `${(Math.random() * 100).toString(32)}-${nome}`
          const s3file = JSON.stringify(file)

          const url = await Drive.put(chave, s3file, {
            tipo_conteudo,
            ACL,
          })

          await Arquivo.create({
            nome,
            chave,
            url,
            tipo_conteudo,
          })
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
