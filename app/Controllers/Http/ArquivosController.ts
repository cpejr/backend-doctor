import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Arquivo from 'App/Models/Arquivo'
import Drive from '@ioc:Adonis/Core/Drive'
import { FileSystemCredentials, Request, S3 } from 'aws-sdk'
import Schema from '@ioc:Adonis/Lucid/Schema'
import { Application } from '@adonisjs/core/build/standalone'

export default class ArquivosController {
  public async index({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    // const postData = await request.validate({
    //   const schema: schema.create({
    //     banner: schema
    //   })
    // })
    // const files = request.file('opa')
    // console.log(files)

    // request.multipart.onFile('imagem', {}, async (part) => {

    // })

    // await request.multipart.process()



  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
