import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EdicaoSobreMims extends BaseSchema {
  protected tableName = 'edicao_sobre_mims'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('titulo_um')
      table.string('imagem_um')
      table.string('texto_um', 10000)
      table.string('titulo_dois')
      table.string('imagem_dois')
      table.string('texto_dois', 10000)
      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
