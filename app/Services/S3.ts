import { MultipartStream, MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import { s3 } from 'Config/s3'
import Env from '@ioc:Adonis/Core/Env'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import fs from 'node:fs'
import { stream2buffer } from 'App/Utils/stream2buffer'
import { Upload } from '@aws-sdk/lib-storage'

class S3Service {
  public async upload(file: MultipartFileContract, chave: string): Promise<string> {
    const fileStream = fs.createReadStream(file.tmpPath!)
    const buffer = await stream2buffer(fileStream)
    const contentType = `${file?.type}/${file?.subtype}`

    const params = {
      Bucket: Env.get('AWS_BUCKET_NAME'),
      Body: buffer,
      Key: chave,
      ContentType: contentType,
      ACL: 'public-read',
    }
    await s3.send(new PutObjectCommand(params))

    const url = `https://${Env.get('AWS_BUCKET_NAME')}.s3.amazonaws.com/${chave}`
    return url
  }

  public async uploadManually2(file: MultipartStream, chave: string): Promise<string> {
    const buffer = await stream2buffer(file)

    const params = {
      Bucket: Env.get('AWS_BUCKET_NAME'),
      Body: buffer,
      Key: chave,
      ContentType: file.headers['content-type'] || 'application/pdf',
      ACL: 'public-read',
    }
    await s3.send(new PutObjectCommand(params))

    const url = `https://${Env.get('AWS_BUCKET_NAME')}.s3.amazonaws.com/${chave}`
    return url
  }

  public async uploadManually(file: MultipartStream, chave: string): Promise<string> {
    const params = {
      Bucket: Env.get('AWS_BUCKET_NAME'),
      Body: file,
      Key: chave,
      ContentType: file.headers['content-type'] || 'application/pdf',
      ACL: 'public-read',
    }

    const upload = new Upload({
      client: s3,
      params: params,
    })

    await upload.done()

    const url = `https://${Env.get('AWS_BUCKET_NAME')}.s3.amazonaws.com/${chave}`
    return url
  }
}

export default new S3Service()
