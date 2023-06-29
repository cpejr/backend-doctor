import Env from '@ioc:Adonis/Core/Env'
import { S3Client } from '@aws-sdk/client-s3'

export const s3 = new S3Client({
  region: Env.get('AWS_REGION'),
  credentials: {
    accessKeyId: Env.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: Env.get('AWS_SECRET_ACCESS_KEY'),
  },
})
