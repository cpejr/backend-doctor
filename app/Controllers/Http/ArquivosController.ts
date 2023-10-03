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
import File from 'multiparty'
import { Readable } from 'stream'
import AssinadorPdfsController from './AssinadorPdfsController'
import FormData, { promises } from 'form-data'

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
  
  public async criaPDFReceita(nomePaciente, dataNascimento, tituloReceita, descricao) {
    if (!nomePaciente || !dataNascimento || !tituloReceita) {
      return false;
    }
   
    return new Promise((resolve, reject) => {
     let FormDataObj = new FormData();

     pdf.create(pdfReceita({nomePaciente, dataNascimento, tituloReceita, descricao}), {}).toFile((err,res) => {
      const tipo_conteudo = 'pdf'
      const ACL = 'public-read'
      const nome = 'PDF'
      const chave = `${(Math.random() * 100).toString()}-${nome}`
      pdf
        .create(pdfReceita({ nomePaciente, dataNascimento, tituloReceita, descricao }), {})
        .toFile((err, res) => {
          if (err) {
            return false;
          }else{
            let arquivo64 = fs.readFileSync(res.filename, {encoding: "base64"});
            const fileBuffer = Buffer.from(arquivo64, 'base64');
            FormDataObj.append("arquivo",fileBuffer, {filename:res.filename, contentType: 'application/pdf'})
            resolve(fileBuffer);
          }

     })

    })
  });
  }

  public async update({ }: HttpContextContract) { }

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
    const hash = crypto.randomBytes(32).toString('hex');
  
    let chave: string | undefined;
    
  
    await request.multipart.onFile('file', {}, async (file) => {
      try {
        chave = `PDF-${hash}-${file.filename}`;
        await S3Service.uploadManually(file, chave);
      } catch (erro) {
        console.error(erro);
      }
    }).process();

    const tipo_conteudo = 'pdf'
    const nome = 'PDF'

    Arquivo.create({
      nome,
      chave,
      tipo_conteudo
    })
    
    return chave;
  }


  public async storeFileApp({ request }: HttpContextContract) {
    
    const chave = request.input('chave');
    const tipo_conteudo = 'pdf'
    const nome = 'PDF'

    Arquivo.create({
      nome,
      chave,
      tipo_conteudo
    })
    
    return chave;
  }
}
