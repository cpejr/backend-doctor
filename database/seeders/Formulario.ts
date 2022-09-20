import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Formulario from 'App/Models/Formulario'

export default class FormularioSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run () {
    await Formulario.create(
      {
        "id": "046975f7-d7d0-4635-a9d9-25efbe65d7b7",
        "titulo": "formulario solar",
        "tipo": "urgencia_formulario",
        "finalidade": "aaa",
        "perguntas": {
          "type": "object",
          "properties": {
            "newInput1": {
              "title": "Data da internação:",
              "type": "date"
            },
            "newInput2": {
              "title": "Nome do Hospital:",
              "type": "string"
            },
            "newInput3": {
              "title": "Médico assistente no hospital:",
              "type": "string"
            },
            "newInput4": {
              "title": "Telefone de contato do hospital:",
              "type": "string"
            }
          },
          "dependencies": {},
          "required": []
        },
        "urgencia": 3
    },
    )
    // Write your database queries inside the run method
  }
}
