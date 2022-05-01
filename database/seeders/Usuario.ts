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
        id_endereco: 'uuid-endereco-1',
        id_consultorio: 'uuid-consultorio-1',
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
        id_endereco: 'uuid-endereco-1',
        id_consultorio: 'uuid-consultorio-1',
      },
      {
        nome: 'Marcia',
        email: 'marcia@cpejr.com.br',
        senha: 'orion2022!',
        data_nascimento: new Date('1990-01-01'),
        cpf: '31335333330',
        telefone: '31982921336',
        tipo: 'SECRETARIA',
        avatar_url: '',
        id_endereco: 'uuid-endereco-1',
        id_consultorio: 'uuid-consultorio-1',
      },
    ])
  }
}
