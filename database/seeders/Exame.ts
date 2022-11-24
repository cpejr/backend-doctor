import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Exame from 'App/Models/Exame'

export default class ExameSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run() {
    await Exame.createMany([
      {
        id: 'e23dd656-d053-4e27-9916-e1745d629bf7',
        titulo: 'EEG (Eletroencefalograma)',
        texto: 'O exame de EEG (Eletroencefalograma) é realizado na Clínica CONRAD\n\nEndereço: rua Rio Grande do Norte, 77 - Santa Efigênia / Belo Horizonte\n\nTel.: (31) 3247-3450/nWhatsApp: (31) 99544-9823/nEmail: callcenter@conrad.com.br',
      },
      {
        id: 'b68006bb-afc7-4013-8bb4-8b438dfb35af',
        titulo: 'Polissonografia',
        texto: 'A Polissonografia é realizada no Laboratório do Sono em Belo Horizonte.\n\nTel.: (31) 3228-0000 e (31) 3269-5555\n\nWhatsApp.: (31)  99335-0798\n\nEndereço.: rua Piauí, 150 - Santa Efigênia - Belo Horizonte',
      },
      {
        id: 'c5327a16-db85-4ee0-8051-5cf87b950292',
        titulo: 'Actigrafia',
        texto: 'A Actigrafia é realizada no consultório principal.\n\nWhatsApp: (31) 97248-8306',
      },
    ])
  }
}