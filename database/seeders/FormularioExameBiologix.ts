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


export default class FormularioExameBiologixSeeder extends BaseSeeder {

  

  public static developmentOnly = true
  public async run () {
    await Formulario.create(
      {
        id: "2abdb136-fa40-439b-b03d-f17e23b3492e",
        titulo: 'Formulario Exame Biologix',
        tipo: 'exame_biologix',
        finalidade: 'Monitorar o sono do paciente',
        perguntas: perguntas,
        urgencia: 3
    },
    )
  }
}