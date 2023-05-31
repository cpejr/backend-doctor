import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Arquivo from 'App/Models/Arquivo'
import Drive from '@ioc:Adonis/Core/Drive'
import pdf from 'html-pdf'
import pdfReceita from '../../templates/Receita'
import fs from 'fs'
import crypto from 'node:crypto'
import Database from '@ioc:Adonis/Lucid/Database'
import { stream2buffer } from 'App/Utils/stream2buffer'
import * as AWS from 'aws-sdk'
import Env from '@ioc:Adonis/Core/Env'
import S3Service from 'App/Services/S3'

// import {
//   DeleteObjectCommand,
//   DeleteObjectsCommand,
//   GetBucketCorsCommand,
//   GetObjectCommand,
//   PutBucketCorsCommand,
//   PutObjectCommand,
//   S3Client,
// } from '@aws-sdk/client-s3'

// const s3 = new S3Client({
//   region: Env.get('AWS_REGION'),
//   credentials: {
//     accessKeyId: Env.get('AWS_ACCESS_KEY_ID'),
//     secretAccessKey: Env.get('AWS_SECRET_ACCESS_KEY'),
//   },
// })

// const s3 = new AWS.S3({
//   region: Env.get('AWS_REGION'),
//   accessKeyId: Env.get('AWS_ACCESS_KEY_ID'),
//   secretAccessKey: Env.get('AWS_SECRET_ACCESS_KEY'),
// })
// async function stream2buffer(stream: any): Promise<Buffer> {
//   return new Promise<Buffer>((resolve, reject) => {
//     const _buf = Array<any>()

//     stream.on('data', (chunk) => _buf.push(chunk))
//     stream.on('end', () => resolve(Buffer.concat(_buf)))
//     stream.on('error', (err) => reject(`error converting stream - ${err}`))
//   })
// }

// export const uploadToS3Bucket = async (
//   file: any,
//   bucket: string
// ): Promise<{ key: string; url: string }> => {
//   try {
//     const chave = crypto.randomBytes(32).toString('hex')
//     const contentType = `${file?.type}/${file?.subtype}`
//     const key = `${chave}-${file?.clientName}`

//     const fileStream = fs.createReadStream(file.tmpPath!)
//     const buffer = await stream2buffer(fileStream)

//     const params = {
//       Bucket: bucket,
//       Body: buffer,
//       Key: key,
//       ContentType: contentType,
//       ACL: 'public-read',
//     }

//     await s3.send(new PutObjectCommand(params))

//     const url = `https://${bucket}.s3.amazonaws.com/${key}`

//     return {
//       key,
//       url,
//     }
//   } catch (err) {
//     console.log(err)
//     return err
//   }
// }
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

  public async store(image) {
    const tipo_conteudo = 'text'
    const ACL = 'public-read'
    const nome = 'doctor-app-image'
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

    return chave
  }

  public async storeImage({ request }: HttpContextContract) {
    const tipo_conteudo = 'text'
    const ACL = 'public-read'
    const nome = 'doctor-app-image'
    const chave = `${(Math.random() * 100).toString()}-${nome}`
    const file = request.input('file').replace(/^data:.+;base64,/, '')

    const fileBuffer = Buffer.from(file, 'base64')

    await Drive.put(chave, fileBuffer, {
      contentType: tipo_conteudo,
      visibility: ACL,
    })

    await Arquivo.create({
      nome,
      chave,
      tipo_conteudo,
    })

    return chave
  }

  public async storePdf(nomePaciente, dataNascimento, tituloReceita, descricao) {
    if (!nomePaciente || !dataNascimento || !tituloReceita) {
      return 0
    }

    const tipo_conteudo = 'pdf'
    const ACL = 'public-read'
    const nome = 'PDF'
    const chave = `${(Math.random() * 100).toString()}-${nome}`
    await pdf
      .create(pdfReceita({ nomePaciente, dataNascimento, tituloReceita, descricao }), {})
      .toFile((err, res) => {
        if (err) {
          return false
        } else {
          let arquivo64 = fs.readFileSync(res.filename, { encoding: 'base64' })
          Drive.put(chave, arquivo64, {
            contentType: tipo_conteudo,
            visibility: ACL,
          })
          Arquivo.create({
            nome,
            chave,
            tipo_conteudo,
          })
        }
      })

    return chave
  }

  public async update({}: HttpContextContract) {}

  public async destroy(chave) {
    try {
      await Database.from('arquivos').where('chave', chave).delete()
      await Drive.delete(chave)
      return 'Arquivo deletado com sucesso!'
    } catch (error) {
      return 'Falha ao apagar o arquivo!'
    }
  }
  public async storeFile({ request }: HttpContextContract) {
    // const file = request.file('file')
    // const chave = `${crypto.randomBytes(32).toString('hex')}-${file?.clientName}`

    // try {
    //   if (!file) throw new Error('Arquivo não encontrado')
    //   const url = await S3Service.upload(file, chave)

    //   console.log(url)
    // } catch (erro) {
    //   console.error(erro)
    // }

    const hash = crypto.randomBytes(32).toString('hex')
    await request.multipart
      .onFile('file', {}, async (file) => {
        try {
          const chave = `${hash}-${file.filename}`
          const url = await S3Service.uploadManually(file, chave)

          return { url }
        } catch (erro) {
          console.error(erro)
        }
      })
      .process()

    const { meta } = request.file('file')!
    console.log(meta?.url)

    // if (!arquivo?.tmpPath) throw new Error(`Ocorreu uma falha com o arquivo ${arquivo?.clientName}`)

    // const tipo_conteudo = `${arquivo.type}/${arquivo.subtype}`
    // const nome = arquivo.clientName
    // const chave = `${(Math.random() * 100).toString()}-${nome}`

    // await Drive.putStream(chave, fs.createReadStream(arquivo.tmpPath), {
    //   contentType: tipo_conteudo,
    //   visibility: 'public-read',
    // })
  }
}
