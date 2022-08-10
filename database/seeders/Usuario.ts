import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Usuario from 'App/Models/Usuario'

export default class UsuarioSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run() {
    await Usuario.createMany([
      {
        nome: 'Mateus',
        email: 'matcpeabcsd@cpejr.com.br',
        senha: 'orion2022!',
        data_nascimento: new Date('1990-01-01'),
        cpf: '31335333330',
        telefone: '31982921336',
        tipo: 'PACIENTE',
        avatar_url: '',
        convenio: 'Unimed',
        nome_cuidador: 'Adrianus Babaca Vieira',
        telefone_cuidador: '19994546785',
        id_endereco: 'eb501944-4d84-4766-94b8-2c8e68badb91',
      },
      {
        nome: 'Guilherme Marques',
        email: 'aplicativos@cpejr.com.br',
        senha: 'orion2022!',
        data_nascimento: new Date('1990-01-01'),
        cpf: '31335333330',
        telefone: '31982921336',
        tipo: 'MASTER',
        avatar_url: '',
        id_endereco: 'b94961b7-7bbd-473f-9374-5adae1698d96'
      },
      {
        nome: 'Marcia Rocha',
        email: 'marcia@cpejr.com.br',
        senha: 'orion2022!',
        data_nascimento: new Date('1990-01-01'),
        cpf: '31335333330',
        telefone: '31982921336',
        tipo: 'SECRETARIA(O)',
        avatar_url: '',
        id_endereco: '1696fc70-0ddf-4aee-8263-69979f0c3ea0',
      },
    ])
  }
}
