import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Formulario from 'App/Models/Formulario'

const perguntas: any = {
  type: 'object',
  properties: {
    newInput1: {
      title: "Como está o sono do paciente?",
      type: "string",
    }
  },
  dependencies: {},
  required: []
}


export default class FormularioExameActigrafiaSeeder extends BaseSeeder {

  

  public static developmentOnly = true
  public async run () {
    await Formulario.create(
      {
        id: "d98bf5e0-73e0-4d59-9c00-a7d79a1174b0",
        titulo: 'Formulario Exame Actigrafia',
        tipo: 'exame_actigrafia',
        finalidade: 'Monitorar o sono do paciente',
        perguntas: perguntas,
        urgencia: 3
    },
    )
  }
}