import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Formulario from 'App/Models/Formulario'

const perguntasUrgencia: any = {
  type: 'object',
  properties: {
    newInput1: {
      title: "Data da internação (no formato DD/MM/AAAA):",
      type: "string",
    },
    newInput2: {
      title: "Nome do Hospital:",
      type: "string"
    },
    newInput3: {
      title: "Médico assistente no hospital:",
      type: "string"
    },
    newInput4: {
      title: "Telefone de contato do hospital no formato (xx) xxxxx-xxxx",
      type: "string"
    },
    newInput5: {
      title: "Faça uma breve descrição do acontecimento:",
      type: "string"
    }
  },
  dependencies: {},
  required: []
}

export default class FormularioSeeder extends BaseSeeder {



  public static developmentOnly = true
  public async run() {
    await Formulario.create(
      {
        id: "046975f7-d7d0-4635-a9d9-25efbe65d7b7",
        titulo: 'Formulario de Urgência',
        tipo: 'urgencia_formulario',
        finalidade: 'auxiliar no diagnóstico de pacientes em situação de emergência',
        perguntas: perguntasUrgencia,
        urgencia: 3
      },
    )
  }
}
