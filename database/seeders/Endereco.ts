import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Endereco from 'App/Models/Endereco'

export default class EnderecoSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run() {
    await Endereco.createMany([
      {
        id: "uuid-endereco-1",
        cep: '30170050',
        pais: 'Brasil',
        estado: 'MG',
        cidade: 'Belo Horizonte',
        bairro: 'Santo Agostinho',
        rua: 'Rua Matias Cardoso',
        numero: 129,
      },
    ])
  }
}
