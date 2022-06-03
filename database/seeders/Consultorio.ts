import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Consultorio from 'App/Models/Consultorio'

export default class ConsultorioSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run() {
    await Consultorio.createMany([
      {
        id: '69a9bf6e-055a-4694-b8c8-3227a6b13cb8',
        id_endereco: 'b94961b7-7bbd-473f-9374-5adae1698d96',
        nome: 'Consultório Principal (Particular)',
      },
      {
        id: '22ee8892-7d71-4c31-bf9f-0b5d1459cf33',
        id_endereco: 'bc40a670-af72-48c0-9678-dbdb0626f74c',
        nome: 'Consultório de Apoio - EPILEPSIA (Credenciado UNIMED)',
      },
      {
        id: '82d8fcc7-2a8c-4092-930c-46782bac6aa9',
        id_endereco: 'bc40a670-af72-48c0-9678-dbdb0626f74c',
        nome: 'Consultório de Apoio - MEDICINA DO SONO',
      },
      {
        id: '196333e5-4fe7-4c85-922e-1d20eff36efa',
        id_endereco: '80673ae3-a55c-46a9-922b-d2652d84b54b',
        nome: 'Clínica CONRAD'
      }
    ])
  }
}
