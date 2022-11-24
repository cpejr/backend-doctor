import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Arquivo from 'App/Models/Arquivo'
import Drive from '@ioc:Adonis/Core/Drive'
import pdf from 'html-pdf'
import pdfReceita from "../../templates/Receita"
import fs from "fs"


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

  public async storeFile({ request }: HttpContextContract) {
    const tipo_conteudo = 'application/pdf'
    const ACL = 'public-read'
    const nome = 'doctor-app-file'
    const chave = `${(Math.random() * 100).toString()}-${nome}`
    const file = request.input('file').replace(/^data:.+;base64,/, "");

    const fileBuffer = Buffer.from(file,'base64')

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
      return 0;
    }
   

    const tipo_conteudo = "pdf"
    const ACL = 'public-read'
    const nome = "PDF"
    const chave = `${(Math.random() * 100).toString()}-${nome}`
    await pdf.create(pdfReceita({nomePaciente, dataNascimento, tituloReceita, descricao}), {}).toStream((err, res) => {
      if (err) {
        return false;
      }
      else {
        Drive.putStream(chave, res, {
          contentType: tipo_conteudo,
          visibility: ACL,
        });

        Arquivo.create({
          nome,
          chave,
          tipo_conteudo,
        });

      }
    });

  return chave;
  }


  public async update({ }: HttpContextContract) { }

  public async destroy(chave) {
    try {
      const arquivo = await Arquivo.findByOrFail('chave', chave)

      await Drive.delete(chave);
      await arquivo.delete()

      return 'Arquivo deletado com sucesso!'
    } catch (error) {
      return 'Falha ao apagar o arquivo!'
    }
  }
}
