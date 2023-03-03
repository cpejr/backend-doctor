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
        tipo: 'CONSULTA'
      },
      {
        id: '22ee8892-7d71-4c31-bf9f-0b5d1459cf33',
        id_endereco: 'bc40a670-af72-48c0-9678-dbdb0626f74c',
        nome: 'Consultório de Apoio - EPILEPSIA (Credenciado UNIMED)',
        tipo: 'CONSULTA'
      },
      {
        id: '82d8fcc7-2a8c-4092-930c-46782bac6aa9',
        id_endereco: 'bc40a670-af72-48c0-9678-dbdb0626f74c',
        nome: 'Consultório de Apoio - MEDICINA DO SONO',
        tipo: 'CONSULTA'
      },
      {
        id: '196333e5-4fe7-4c85-922e-1d20eff36efa',
        id_endereco: '80673ae3-a55c-46a9-922b-d2652d84b54b',
        nome: 'Clínica CONRAD',
        tipo: 'EXAME'
      },
      {
        id: 'ce4c4229-620b-4527-b125-141a23c063bc',
        id_endereco: '5de7fee5-c181-4207-8f84-689487df341f',
        nome: 'Laboratório do Sono',
        tipo: 'EXAME'
      },
      {
        id: 'f9c7cd1d-7d3f-4259-9c19-97416bd9cc5f',
        id_endereco: 'b94961b7-7bbd-473f-9374-5adae1698d96',
        nome: 'Consultório Principal (Particular)',
        tipo: 'EXAME'
      },
    ])
  }
}
