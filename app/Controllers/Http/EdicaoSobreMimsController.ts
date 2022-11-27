import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EdicaoSobreMim from 'App/Models/EdicaoSobreMim'
import {
  EdicaoSobreMimValidatorGet,
  EdicaoSobreMimValidatorStore,
  EdicaoSobreMimValidatorUpdate
} from 'App/Validators/EdicaoSobreMimValidator'
import ArquivosController from './ArquivosController'
export default class EdicaoSobreMimsController {
  protected arquivoscontroller: ArquivosController = new ArquivosController()

  public async index({ request }: HttpContextContract) {
    const edicaoSobreMimsData = await request.validate(EdicaoSobreMimValidatorGet)

    const edicoesSobreMim = await EdicaoSobreMim.query()
      .where(edicaoSobreMimsData)
      .preload('imagem_um', (query) => query.select('nome', 'url', 'tipo_conteudo'))
      .preload('imagem_dois', (query) => query.select('nome', 'url', 'tipo_conteudo'))

    return edicoesSobreMim
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const {
      titulo_um,
      imagem_um,
      texto_um,
      titulo_dois,
      texto_dois,
      imagem_dois
    } = await request.validate(EdicaoSobreMimValidatorStore)

    const awsExtensao = 'edicaoSobreMim-imagem'
    const promises = [
      this.arquivoscontroller.storeStream(imagem_um, awsExtensao),
      this.arquivoscontroller.storeStream(imagem_dois, awsExtensao)
    ]
    const [id_imagem_um, id_imagem_dois] = await Promise.all(promises)

    const novoEdicaoSobremMim = await EdicaoSobreMim.create({
      titulo_um,
      id_imagem_um,
      texto_um,
      titulo_dois,
      texto_dois,
      id_imagem_dois
    })

    return novoEdicaoSobremMim
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    const {
      imagem_um,
      imagem_dois,
      ...edicaoSobreMimsUpdate
    } = await request.validate(EdicaoSobreMimValidatorUpdate)

    const edicaoSobreMim = await EdicaoSobreMim.findOrFail(id)
    const awsExtensao = 'edicaoSobreMim-imagem'

    if (imagem_um) {
      const { id_imagem_um } = edicaoSobreMim
      await this.arquivoscontroller.update(id_imagem_um, imagem_um, awsExtensao)
    }
    if (imagem_dois) {
      const { id_imagem_dois } = edicaoSobreMim
      await this.arquivoscontroller.update(id_imagem_dois, imagem_dois, awsExtensao)
    }

    edicaoSobreMim.merge(edicaoSobreMimsUpdate)
    await edicaoSobreMim.save()

    return edicaoSobreMim
  }

  public async destroy({ request }: HttpContextContract) {
    try {
      const id = request.param('id')

      const edicaoSobreMim = await EdicaoSobreMim.findOrFail(id)

      await this.arquivoscontroller.delete(edicaoSobreMim.id_imagem_um)
      await this.arquivoscontroller.delete(edicaoSobreMim.id_imagem_dois)

      await edicaoSobreMim.delete()

      return "Página de Edição Sobre Mim excluída com sucesso!"
    } catch (error) {
      return `Falha ao apagar Edição Sobre Mim:\n\n${error}`
    }
  }
}
