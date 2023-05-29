import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Arquivo from 'App/Models/Arquivo'
import Drive from '@ioc:Adonis/Core/Drive'
import pdf from 'html-pdf'
import pdfReceita from '../../templates/Receita'
import fs from 'fs'
import Database from '@ioc:Adonis/Lucid/Database'
import File from 'multiparty'
import { Readable } from 'stream'
import AssinadorPdfsController from './AssinadorPdfsController'
import FormData from 'form-data'

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
    const file = request.input('file').replace(/^data:.+;base64,/, "");

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
      let FormDataObj = {
        buffer: {},
        filename: '',
        contentType: ''
      };

      pdf.create(pdfReceita({ nomePaciente, dataNascimento, tituloReceita, descricao }), {}).toFile((err, res) => {
        if (err) {
          reject(err);
        } else {
          let arquivo64 = fs.readFileSync(res.filename, { encoding: "base64" });
          const fileBuffer = Buffer.from(arquivo64, 'base64');
          FormDataObj.buffer = fileBuffer;
          FormDataObj.filename = res.filename;
          FormDataObj.contentType = 'application/pdf';
          resolve(FormDataObj);
        }
      });
    });
  }

  public async update({ }: HttpContextContract) { }

  public async destroy(chave) {
    try {
      await Database.from('arquivos').where('chave', chave).delete();
      await Drive.delete(chave)
      return 'Arquivo deletado com sucesso!'
    } catch (error) {
      return 'Falha ao apagar o arquivo!'
    }
  }
  public async storeFile({ request }: HttpContextContract) {
    const file = request.input('file')
    const tipo_conteudo = 'pdf'
    const ACL = 'public-read'
    const nome = 'PDF'
    const chave = `${(Math.random() * 100).toString()}-${nome}`

    await Drive.put(chave, file, {
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
}
