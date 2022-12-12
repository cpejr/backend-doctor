import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SobreMim from 'App/Models/SobreMim'
import {
  SobreMimValidatorGet,
  SobreMimValidatorStore,
  SobreMimValidatorUpdate
} from 'App/Validators/SobreMimValidator'
import ArquivosController from './ArquivosController'
export default class SobreMimsController {
  protected arquivoscontroller: ArquivosController = new ArquivosController()

  public async index({ request }: HttpContextContract) {
    const sobreMimsData = await request.validate(SobreMimValidatorGet)

    const sobreMims = await SobreMim.query()
      .where(sobreMimsData)
      .preload('imagem_um', (query) => query.select('url'))
      .preload('imagem_dois', (query) => query.select('url'))
      .select(
        'id',
        'titulo_um',
        'id_imagem_um',
        'id_imagem_dois',
        'texto_um',
        'titulo_dois',
        'texto_dois',
      )

    return sobreMims
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
    } = await request.validate(SobreMimValidatorStore)

    const awsExtensao = 'paginaSobreMim-imagem'
    const visibility = 'public'
    const promises = [
      this.arquivoscontroller.storeStream(imagem_um, awsExtensao, visibility),
      this.arquivoscontroller.storeStream(imagem_dois, awsExtensao, visibility)
    ]
    const [id_imagem_um, id_imagem_dois] = await Promise.all(promises)

    const novoSobremMim = await SobreMim.create({
      titulo_um,
      id_imagem_um,
      texto_um,
      titulo_dois,
      texto_dois,
      id_imagem_dois
    })

    return novoSobremMim
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    const {
      imagem_um,
      imagem_dois,
      ...sobreMimsUpdate
    } = await request.validate(SobreMimValidatorUpdate)

    const sobreMim = await SobreMim.findOrFail(id)
    const awsExtensao = 'paginaSobreMim-imagem'
    const visibility = 'public'

    if (imagem_um) {
      const { id_imagem_um } = sobreMim
      await this.arquivoscontroller.update(id_imagem_um, imagem_um, awsExtensao, visibility)
    }
    if (imagem_dois) {
      const { id_imagem_dois } = sobreMim
      await this.arquivoscontroller.update(id_imagem_dois, imagem_dois, awsExtensao, visibility)
    }

    sobreMim.merge(sobreMimsUpdate)
    await sobreMim.save()

    return sobreMim
  }

  public async destroy({ request }: HttpContextContract) {
    try {
      const id = request.param('id')

      const sobreMim = await SobreMim.findOrFail(id)

      await this.arquivoscontroller.delete(sobreMim.id_imagem_um)
      await this.arquivoscontroller.delete(sobreMim.id_imagem_dois)

      await sobreMim.delete()

      return "Página de Edição Sobre Mim excluída com sucesso!"
    } catch (error) {
      return `Falha ao apagar Edição Sobre Mim:\n\n${error}`
    }
  }
}
