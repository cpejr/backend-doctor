import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Arquivo from 'App/Models/Arquivo'
import Drive from '@ioc:Adonis/Core/Drive'
import pdf from 'html-pdf'
import pdfReceita from '../../templates/Receita'
import fs from 'fs'
import Database from '@ioc:Adonis/Lucid/Database'
import File  from 'multiparty'
import {Readable } from 'stream'
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

  public async storePdf(nomePaciente, dataNascimento, tituloReceita, descricao) {
    if (!nomePaciente || !dataNascimento || !tituloReceita) {
      return 0
    }
    //const assinadorpdfscontroller:AssinadorPdfsController = new AssinadorPdfsController(); 
    var chave64;
    const tipo_conteudo = 'pdf'
    const ACL = 'public-read'
    const nome = 'PDF'
    const chave = `${(Math.random() * 100).toString()}-${nome}`
    const retorno = new FormData();
    await pdf.create(pdfReceita({ nomePaciente, dataNascimento, tituloReceita, descricao }), {}).toFile((err, res) => {
      if (err) {
        return false;
      }
      else {
        let arquivo64 = fs.readFileSync(res.filename, { encoding: "base64" });
        const fileBuffer = Buffer.from(arquivo64, 'base64');
        /*const readableStream = new Readable();
        readableStream.push(fileBuffer);
        readableStream.push(null);*/
        retorno.append('arquivo', fileBuffer, {filename: res.filename, contentType: 'application/pdf' });
        console.log(retorno);
        /*;
        const file = new File({
          fieldName: 'arquivo',
          originalFilename: res.filename,
          path: '', 
          headers: {
            'content-type': 'application/pdf',
            'content-length': fileBuffer.length,
          },
        });     
        file.stream = readableStream;*/

       /* const formData = new FormData();
        formData.append('arquivo', readableStream, {filename: res.filename, contentType: 'application/pdf' });
        /*const Retorno: { chave1: string, chave2: FormData } = {
          chave1: chave,
          chave2: formData
        };*/
        //console.log(formInicializar);
        //const retorno =  assinadorpdfscontroller.inicializar(formInicializar);
        //console.log(retorno);
        
        //return formData;
        /*Drive.put(chave, arquivo64, {
          contentType: tipo_conteudo,
          visibility: ACL,
        });
        Arquivo.create({
          nome,
          chave,
          tipo_conteudo,
        });
      }*/
    }
    });
    /* var retorno = {
      "chavecriada": chave,
      "base": chave64,
    };*/
    //return retorno.chavecriada;
    return retorno;
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
