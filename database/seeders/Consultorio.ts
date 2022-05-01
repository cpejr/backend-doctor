import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Consultorio from 'App/Models/Consultorio'

export default class ConsultorioSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run() {
    await Consultorio.createMany([
      {
        id: 'uuid-consultorio-1',
        id_endereco: 'uuid-endereco-1',
        nome: 'Consultorio 1',
      },
    ])
  }
}
