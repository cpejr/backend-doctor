import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Amie from 'App/Models/Amie'
import AmiesDTO from 'App/DTO/AmiesDTO'
import AmiesRepository from 'App/Repositories/AmiesRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { AmieValidatorStore, AmieValidatorUpdate } from 'App/Validators/AmieValidator'
import ArquivosController from 'App/Controllers/Http/ArquivosController'

export default class AmiesController {
  public async index({ request }: HttpContextContract) {
    const amieData = {
      id: request.param('id'),
      imagem_um: request.param('imagem_um'),
      texto: request.param('texto'),
      imagem_dois: request.param('imagem_dois'),
    } as AmiesDTO
    const amies = await AmiesRepository.find(limpaCamposNulosDeObjeto(amieData))
    return amies
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(AmieValidatorStore)

    const imagem_um = validateData.imagem_um
    const texto = validateData.texto
    const imagem_dois = validateData.imagem_dois

    const amie = await Amie.create({
      imagem_um,
      texto,
      imagem_dois,
    })
    return amie
  }

  public async update({ request }: HttpContextContract) {

    const arquivoscontroller: ArquivosController = new ArquivosController();

    const id = request.param('id')
    if (!id) return

    const amie = await Amie.findOrFail(id)

    if (amie.imagem_um != undefined && amie.imagem_um != null && amie.imagem_um != "") {
      const chave1 = amie.imagem_um;
      await arquivoscontroller.destroy(chave1);
    }
    if (amie.imagem_dois != undefined && amie.imagem_dois != null && amie.imagem_dois != "") {
      const chave2 = amie.imagem_dois;
      await arquivoscontroller.destroy(chave2);
    }


    const file1 = request.input('imagem_um');
    const file2 = request.input('imagem_dois');
    const res1 = await arquivoscontroller.store(file1);
    const res2 = await arquivoscontroller.store(file2);

    amie.$attributes.imagem_um = res1;
    amie.$attributes.imagem_dois = res2;
    amie.$attributes.texto = request.input('texto');

    await amie.save()

    return amie
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const amie = await Amie.findOrFail(id)
    await amie.delete()

    return amie
  }
}
