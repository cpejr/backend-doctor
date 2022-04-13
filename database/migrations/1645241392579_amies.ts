import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Amies extends BaseSchema {
  protected tableName = 'amies'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('imagem_um').notNullable()
      table.string('texto').notNullable()
      table.string('imagem_dois').notNullable()

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
