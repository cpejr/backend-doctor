import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Exame from 'App/Models/Exame'

export default class ExameSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run() {
    await Exame.createMany([
      {
        id: 'e23dd656-d053-4e27-9916-e1745d629bf7',
        titulo: 'EEG (Eletroencefalograma)',
        texto: 'Tel.: (31) 3247-3450, WhatsApp: (31) 99544-9823, Email:  callcenter@conrad.com.br',
      },
      {
        id: 'b68006bb-afc7-4013-8bb4-8b438dfb35af',
        titulo: 'Polissonografia',
        texto: 'Tel.: (31) 3228-0000 e (31) 3269-5555, WhatsApp.: (31)  99335-0798',
      },
      {
        id: 'c5327a16-db85-4ee0-8051-5cf87b950292',
        titulo: 'Actigrafia',
        texto: 'WhatsApp: (31) 97248-8306',
      },
      {
        id: 'b575e0b0-6fbb-4730-970a-ca4196ab4a53',
        titulo: 'Biologix',
        texto: 'Biologix é um tipo de polissonografia domiciliar, ideal para diagnóstico e tratamento da apneia do sono.',
      },
    ])
  }
}