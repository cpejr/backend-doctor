import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Indicacaos extends BaseSchema {
  protected tableName = 'indicacaos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('texto')

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
