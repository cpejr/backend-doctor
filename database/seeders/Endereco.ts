import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Endereco from 'App/Models/Endereco'

export default class EnderecoSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run() {
    await Endereco.createMany([
      {
        id: "b94961b7-7bbd-473f-9374-5adae1698d96",
        cep: '30170050',
        pais: 'Brasil',
        estado: 'MG',
        cidade: 'Belo Horizonte',
        bairro: 'Santo Agostinho',
        rua: 'Rua Matias Cardoso',
        numero: 129,
        complemento:'Pilotis, sala 01'
      },
      {
        id: "bc40a670-af72-48c0-9678-dbdb0626f74c",
        cep: '30170050',
        pais: 'Brasil',
        estado: 'MG',
        cidade: 'Belo Horizonte',
        bairro: 'Santo Agostinho',
        rua: 'Rua Matias Cardoso',
        numero: 145,
        complemento: 'Pilotis, sala 05'
      },
      {
        id: "80673ae3-a55c-46a9-922b-d2652d84b54b",
        cep: '30130130',
        pais: 'Brasil',
        estado: 'MG',
        cidade: 'Belo Horizonte',
        bairro: 'Santa Efigênia',
        rua: 'Rua Rio Grande do Norte',
        numero: 77
      },
      {
        id: "eb501944-4d84-4766-94b8-2c8e68badb91",
        cep: '30130130',
        pais: 'Brasil',
        estado: 'MG',
        cidade: 'Belo Horizonte',
        bairro: 'Santa Efigênia',
        rua: 'Rua Piauí',
        numero: 150
      },
    ])
  }
}
