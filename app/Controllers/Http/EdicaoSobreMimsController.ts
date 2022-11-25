import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EdicaoSobreMimDTO from 'App/DTO/EdicaoSobreMimDTO'
import EdicaoSobreMimRepository from 'App/Repositories/EdicaoSobreMimRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { EdicaoSobreMimValidatorStore } from 'App/Validators/EdicaoSobreMimValidator'
import EdicaoSobreMim from 'App/Models/EdicaoSobreMim'
import ArquivosController from './ArquivosController'
import Drive from '@ioc:Adonis/Core/Drive'
import Arquivo from 'App/Models/Arquivo'
import fs from "node:fs

export default class EdicaoSobreMimsController {
  public async index({ request }: HttpContextContract) {
    const query = request.qs()
    const edicaoSobreMimsData = {
      id: query.id,
      titulo_um: query.titulo_um,
      imagem_um: query.imagem_um,
      texto_um: query.texto_um,
      titulo_dois: query.titulo_dois,
      imagem_dois: query.imagem_dois,
      texto_dois: query.texto_dois,
    } as EdicaoSobreMimDTO

    const edicaoSobreMims = await EdicaoSobreMimRepository.find(
      limpaCamposNulosDeObjeto(edicaoSobreMimsData)
    )

    const dadosFormatados = [] as any[]

    for (const { imagem_um: chave1, imagem_dois: chave2, ...propsResto } of edicaoSobreMims) {
      const arquivos = await Promise.all(
        [chave1, chave2].map((chave) => Arquivo.findByOrFail('chave', chave))
      )

      const [url1, url2] = await Promise.all(arquivos.map((arquivo) => Drive.get(arquivo.chave)))

      dadosFormatados.push({
        ...propsResto,
        imagem_um: url1,
        imagem_dois: url2,
      })
    }

    return dadosFormatados
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    // const arquivosController: ArquivosController = new ArquivosController()
    // const validateData = await request.validate(EdicaoSobreMimValidatorStore)

    // const titulo_um = validateData.titulo_um
    // const imagem_um = validateData.imagem_um
    // const texto_um = validateData.texto_um
    // const titulo_dois = validateData.titulo_dois
    // const imagem_dois = validateData.imagem_dois
    // const texto_dois = validateData.texto_dois

    // const requisicoes = [arquivosController.store(imagem_um), arquivosController.store(imagem_dois)]
    // const [chave1, chave2] = await Promise.all(requisicoes)

    // const edicaoSobreMim = await EdicaoSobreMim.create({
    //   titulo_um,
    //   imagem_um: chave1,
    //   texto_um,
    //   titulo_dois,
    //   imagem_dois: chave2,
    //   texto_dois,
    // })
    const ACL = 'public-read'
    const file = request.file('FILE')
    const nome = 'doctor-app-image'
    const chave = `${(Math.random() * 100).toString()}-${nome}`

    // const url = await file?.moveToDisk(
    //   '/',
    //   {
    //     visibility: ACL,
    //     contentType: file?.headers['content-type'],
    //     name: chave,
    //   },
    //   's3'
    // )

    await Drive.putStream(chave, fs.createReadStream(file?.tmpPath!), {
      contentType: file?.headers['content-type'],
      // visibility: ACL
    })

    const url = await Drive.getSignedUrl(chave)
    console.log(url)
    // await Drive.put(chave, , {
    //   contentType: file?.headers['content-type'],
    //   visibility: ACL,
    // })

    // await Arquivo.create({
    //   nome,
    //   chave,
    //   tipo_conteudo,
    // })

    return url
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
