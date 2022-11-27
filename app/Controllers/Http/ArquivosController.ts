import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Arquivo from 'App/Models/Arquivo'
import Drive from '@ioc:Adonis/Core/Drive'
import pdf from 'html-pdf'
import pdfReceita from "../../templates/Receita"
import fs from "fs"
export default class ArquivosController {

  public async indexByChave({ request }: HttpContextContract) {
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

  public async storeStream(arquivo: MultipartFileContract, awsExtensao: string): Promise<string> {
    if (!arquivo.tmpPath) throw new Error(`Ocorreu uma falha com o arquivo ${arquivo.clientName}`)

    const tipo_conteudo = arquivo.type
    const nome = arquivo.clientName;
    const chave = `${(Math.random() * 100).toString()}-${awsExtensao}`

    await Drive.putStream(chave, fs.createReadStream(arquivo.tmpPath), {
      contentType: tipo_conteudo,
    })

    const url = await Drive.getSignedUrl(chave);
    const { id: id_arquivo } = await Arquivo.create({
      nome,
      chave,
      url: url,
      tipo_conteudo,
    })

    return id_arquivo
  }

  public async update(id: string, arquivo: MultipartFileContract, awsExtensao: string): Promise<string> {
    if (!arquivo.tmpPath) throw new Error(`Ocorreu uma falha com o arquivo ${arquivo.clientName}`)

    const tipo_conteudo = arquivo.type
    const nome = arquivo.clientName
    const chaveNova = `${(Math.random() * 100).toString()}-${awsExtensao}`

    const arquivoAntigo = await Arquivo.findOrFail(id)

    await Promise.all([
      Drive.delete(arquivoAntigo.chave),
      Drive.putStream(chaveNova, fs.createReadStream(arquivo.tmpPath), { contentType: tipo_conteudo })
    ])
    const newUrl = await Drive.getSignedUrl(chaveNova)

    arquivoAntigo.merge({
      nome,
      chave: chaveNova,
      url: newUrl,
      tipo_conteudo,
    })

    await arquivoAntigo.save()

    return chaveNova
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

  public async delete(id: string) {
    try {
      const arquivo = await Arquivo.findOrFail(id)

      await Drive.delete(arquivo.chave);
      await arquivo.delete()

      return 'Arquivo deletado com sucesso!'
    } catch (error) {
      return `Falha ao apagar o arquivo:\n\n${error}`
    }
  }

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
