import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Formulario from 'App/Models/Formulario'

export default class FormularioSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run () {
    await Formulario.create(
      {
        "titulo": "formulario solar",
        "tipo": "urgencia_formulario",
        "finalidade": "aaa",
        "perguntas": {
          "type": "object",
          "properties": {
            "newInput1": {
              "title": "qual sua urgencia nesse exato instante paciente?",
              "type": "string"
            },
            "newInput2": {
              "title": "qual sua urgencia nesse exato instante?",
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
